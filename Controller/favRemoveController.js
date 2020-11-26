const UserModel = require('../DataModel').users
const ResturantModel = require('../DataModel').resturants

exports.removeFav = (req, res) => {
    var resturantid = req.body.rid
    var userid = req.body.uid
    //remove the favRestaurant from the user favorite array in DB
    UserModel.findOne({ _id: userid }, (err, data) => {
        if (err)
            return res.status(400).send('error')
        if (!data)
            return res.status(401).send('no user Found')
        else {
            removeElement(data.favoriteRes, resturantid)
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
                            removeElement(data.Likes, userid)
                            ResturantModel.update({ _id: resturantid }, { Likes: data.Likes }, (err, data) => {
                                if (err)
                                    return res.status(400).send('error')
                                if (data) {
                                    ResturantModel.findOne({ _id: resturantid }, (err, data) => {
                                        if (err) { console.log(err) }
                                        if (!data) {
                                            console.log('no data')
                                        }
                                        if (data) {
                                            return res.status(200).send(data)
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}



function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}