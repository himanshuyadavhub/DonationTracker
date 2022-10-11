const express = require('express');
const router = express.Router();


const controller = require('../controller');
const isAuth = require('../Middleware/isAuth');

router.route('/allCreators')
    .get(isAuth,controller.allCreator);

router.route('/register')
    .post(controller.register_post)
    .get((req,res)=>{res.send('Register page!')});

router.route('/login')
    .post(controller.login_post)
    .get((req,res)=>{res.send('Login page!')});

router.route('/donation')
    .post(isAuth , controller.donation)
    .get(isAuth , (req,res)=>{res.send('Donation screen')});

router.route('/particularDonations/')
    .get(isAuth,controller.particularDonations)

router.route('/logout')
    .post(controller.logout);



module.exports = router;