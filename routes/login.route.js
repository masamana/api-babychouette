const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const loginSchema = require('../models/login');
const validator = require('../utils/validator');
const config = require('../config');


const router = express.Router();

router.route('/')
    .post(validator(loginSchema), async (req, res) => {
        
        let user = await userController.getByEmailAndPassword(req.body);
      
        if (!user) {
            res.status(401).json({message: "Combinaison email/password incorrecte"});
        } else {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                roles: user.roles
            }, config.jwtPass, { expiresIn: config.jwtExpireLength });
    
            res.status(200).json({
                access_token: token,
                roles: user.roles

            });
        }
    })
    ;
    
// router.route('/admin')
//     .post(validator(loginSchema), async (req, res) => {

//         let user = await userController.getByEmailAndPassword(req.body);
      
//         if (!user) {
//             res.status(401).json({message: "Combinaison email/password incorrecte"});
//         } else {
//             const token = jwt.sign({
//                 id: user.id,
//                 email: user.email,
//                 roles: user.roles
//             }, config.jwtPass, { expiresIn: config.jwtExpireLength });
    
//             res.status(200).json({
//                 access_token: token,
//                 roles: user.roles
                
                
//             });
//         }
//     })    
    
// ;

// router.route('/test')
//     .get(loginValidator.isAuth(), (req, res) => {
//         res.json({message: "coucou"});
//     })
// ;


module.exports = router;