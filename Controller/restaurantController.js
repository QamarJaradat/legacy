const restaurants = require('../DataModel').resturants
const restData = require('../restdata/restaurant.json')


exports.fillrest = (req, res) => {
    for (let index = 0; index < restData.length; index++) {
        var rest = new restaurants(restData[index])
        rest.save((err, rest1) => {
            if (err)
                console.log(err)
            console.log(rest1)
        })
    }
    res.send(restData)

}

exports.allrest = (req, res) => {
    restaurants.find({}, (err, trips) => {
        if (err)
            res.send(err);
        res.json(restaurants);
    });
}
exports.searchrest = (req, res) => {
    restaurants.find({ Name: req.body.restname }, (err, onerest) => {
        if (err)
            res.send(err);
        else {
            if (!onerest) {
                return res.status(401).send("no rest founded")
            }
            return res.status(200).send(onerest);
        }
    });
}
exports.getrest = (req, res) => {
    console.log(req.body)

    restaurants.findOne({ restname: req.body.restname }, (err, data) => {
        if (data) {
            res.send(data)

        }
    })

}

// let RestaurantController =
// {
//     find: async (req, res) => {
//         let found = await Restaurant.find({ name: req.params.Name });
//         res.json(found);
//     },
//     all: async (req, res) => {
//         let allRestaurants = await Restaurant.find();
//         res.json(allRestaurants);
//     },
//     create: async (req, res) => {
//         let newRestaurant = new Restaurant(req.body);
//         let saveRestaurant = await newRestaurant.save();
//         res.json(saveRestaurant);
//     },
//     getAllRestaurant: async (req, res) => {
//         let foundRestaurant = await Restaurant.find({ name: req.params.Name }).populate('category');
//         res.json(foundRestaurant)
//     }


// }


//module.exports = RestaurantController
