const resturants = require('../DataModel').resturants
//search controller will find all restaurants in DB then use filter to find the matching restaurants
exports.searchrest = (req, res) => {
    resturants.find({}, (err, data) => {
        if (err) {
            return res.status(400).send("error")
        }
        if (!data) {
            return res.status(401).send("no data")
        }
        if (data) {
            if (!req.body.search) {
                console.log("empty")
                return res.status(201).send("empty")
            }
            else { }
            data = data.filter((value) => {
                return ((value.Name).toLowerCase()).includes((req.body.search).toLowerCase())
            })
            return res.status(200).send(data)
        }
    })
}

