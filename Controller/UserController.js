const UserModel = require('../DataModel').users
const bcrypt = require('bcryptjs')
//JWT
const jwt = require('jsonwebtoken');
exports.signUpUser = async (req, res) => {
    console.log(req.body)
    const salt = await bcrypt.genSalt(10)
    
    const hashedPass = await bcrypt.hash(req.body.userPass, salt)
    // User Data when Signing up
    // console.log(req.body)
    if (!req.body.userName) {
        return res.status(451).send('error')
    }
    if (!req.body.userPass) {
        return res.status(421).send('error')
    }
    if (!req.body.userMail) {
        return res.status(411).send('error')
    }

    UserModel.findOne({ userMail: req.body.userMail }, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).send('error')
        }
        if (!user) {
            var newuser = new UserModel()
            newuser.userName = req.body.userName
            newuser.userMail = req.body.userMail
            // newuser.userimage = req.body.userimage
            newuser.userPass = hashedPass
            // newuser.userNum = req.body.userNum
            newuser.feedBack = []
            newuser.favoriteRes = []
            newuser.save((err, saveduse) => {
                if (err) {
                    console.log(err)
                    return res.status(400).send('error')
                }
                var token = jwt.sign({ _id: saveduse._id }, process.env.TOKEN_SECRET)
                res.cookie('authToken', token)
                return res.status(200).send('created')
            })
        }
        else
            return res.status(406).send('user existed')
    })
}

exports.loginUser = (req, res) => {
    var userMail = req.body.userMail
    if (!userMail) {
        return res.status(410).send('error')
    }
    UserModel.findOne({ userMail: userMail }, async (err, user) => {
        if (err) {
            console.log(err)
            return res.status(500).send('error')
        }
        if (!user) {
            console.log('user not found')
            return res.status(404).send('not found user')
        }
        else {
            const vaildPass = await bcrypt.compare(req.body.userPass, user.userPass)
            if (!vaildPass) {
                res.status(400).send('invalid Password')
            }
            else {
                var token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
                res.cookie('authToken', token)
                return res.status(200).send(token)
            }
        }
    })
}

exports.userlogout = (req, res) => {
    res.cookie('authToken', '')
    res.status(200).send(req.user)
}

exports.checkuser = (req, res) => { return (req.user) }

exports.getuserinfo = (req, res) => {
    UserModel.findOne({ _id: req.body.id }, (err, userData) => {
        // console.log(req.body._id)
        if (err) {
            console.log(err)
            return res.status(500).send('error')
        }
        if (!userData) {
            console.log('user not found')
            return res.status(404).send('not found user')
        }
        else {
            return res.status(200).send(userData)
        }
    })
}