const resturants = require('../DataModel').resturants
exports.findTop5 = (req, res) => {
    var mysort = { restaurantRate: -1 };
    return resturants.find().sort(mysort).limit(5)
}

