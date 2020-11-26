const UserModel = require('../DataModel').users
const ResturantModel = require('../DataModel').resturants

exports.addFav = (req, res) => {
    var resturantid = req.body.rid
    var userid = req.body.uid
    //add the favRestaurant to the user favorite array in DB
    UserModel.findOne({ _id: userid }, (err, data) => {
        if (err)
            return res.status(400).send('error')
        if (!data)
            return res.status(401).send('no user Found')
        else {
            data.favoriteRes.push(resturantid)
            UserModel.update({ _id: userid }, { favoriteRes: data.favoriteRes }, (err, data) => {
                if (err)
                    return res.status(400).send('error')
                if (data) {
                    ResturantModel.findOne({ _id: resturantid }, (err, data) => {
                        if (err)
                            return res.status(400).send('error')
                        if (!data)
                            return res.status(401).send('resturant not Found')
                        else {
                            data.Likes.push(userid)
                            ResturantModel.update({ _id: resturantid }, { Likes: data.Likes }, (err, data) => {
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