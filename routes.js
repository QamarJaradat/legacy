const express = require('express');
const routers = express.Router();
const auth = require('./auth')
// User Controller 
const userController = require('./Controller/UserController')

routers.post('/signup', userController.signUpUser);
routers.post('/login', userController.loginUser);
routers.post('/logout', userController.userlogout)
routers.get('/checkuser', auth, (req, res) => {
    res.send(userController.checkuser(req, res))
})
routers.post('/getuserinfo', userController.getuserinfo)

//Restaurant Controller
const restController = require('./Controller/restaurantController')
routers.post('/filldata', restController.fillrest)
routers.post('/rest', restController.allrest);
routers.post('/search', restController.searchrest);
routers.post('/getonerest', restController.getrest);




//feedback Controller
const FeedBackController = require('./Controller/feedBackController')
routers.post('/feedback', FeedBackController.addFeedBack)
routers.post('/getcat', FeedBackController.getbycat);


//Restaurant Search Controller
const searchController = require('./Controller/searchController')
routers.post('/searchrest', searchController.searchrest)


//Top 5 Restaurant Controller
const Top5Conntroller = require('./Controller/top5Controller')
routers.get('/gettop5', (req, res) => {
    Top5Conntroller.findTop5().then((response) => {
        res.end(JSON.stringify(response))
    }).catch((error) => { console.log(error) })
})



//fav Controller 
const FavController = require('./Controller/favController')
routers.post('/addfav', FavController.addFav)

//remov Fav Controller
const RemoveFavController = require('./Controller/favRemoveController')
routers.post('/removefav', RemoveFavController.removeFav)



module.exports = routers;