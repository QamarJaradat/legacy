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
routers.post('/get', restController.getrest);


const feedback = require('./Controller/feedBackController')
routers.post('/getcat', feedback.getbycat);

const searchController = require('./Controller/searchController')

routers.post('/searchrest', searchController.searchrest)



module.exports = routers;