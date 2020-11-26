const UserModel = require('../DataModel').users
const ResturantModel = require('../DataModel').resturants

exports.addFeedBack = (req, res) => {
    var resturantid = req.body.rid
    var userid = req.body.uid
    //add the feedback to the user DB
    UserModel.findOne({ _id: userid }, (err, data) => {
        if (err)
            return res.status(400).send('error')
        if (!data)
            return res.status(401).send('no user Found')
        else {
            var feedback = {
                restname: req.body.restname,
                text: req.body.text,
                rate: req.body.rate
            }
            data.feedBack.push(feedback)
            UserModel.update({ _id: userid }, { feedBack: data.feedBack }, (err, data) => {
                if (err)
                    return res.status(400).send('error')
                if (data) {
                    //add the feedback to the resturant DB

                    ResturantModel.findOne({ _id: resturantid }, (err, data) => {
                        if (err)
                            return res.status(400).send('error')
                        if (!data)
                            return res.status(401).send('resturant not Found')
                        else {
                            var feedback = {
                                username: req.body.username,
                                text: req.body.text,
                                rate: req.body.rate
                            }
                            data.resturantFeedback.push(feedback)
                            var rate = average(data.resturantFeedback)
                            ResturantModel.update({ _id: resturantid }, { resturantFeedback: data.resturantFeedback }, (err, data) => {
                                if (err)
                                    return res.status(400).send('error')
                                if (data)
                                    return res.status(200).send('feedback updated')
                            })
                        }
                    })
                }
            })
        }
    })


}

exports.getbycat = (req, res) => {
    ResturantModel.find({ categoty: { $all: [req.body.cat] } }, (err, data) => {
        if (err)
            return res.status(400).send('error')

        if (!data)
            return res.status(402).send('not found category')
        return res.status(200).send(data)
    })
}

function average(nums) {
    return nums.reduce((a, b) => (a + b)) / nums.length;
}