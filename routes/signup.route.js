const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const signUpSchema = require('../models/signup');
const validator = require('../utils/validator');
const config = require('../config');

const router = express.Router();


router.route('/')
    .post(validator(signUpSchema), async (req, res) => {
        const user = await userController.getByEmail(req.body);

        if (user) {
            res.status(400).json({message: "L'email est déjà utilisé !"});
        } else {
            const newUser = await userController.add(req.body);
            // const token = jwt.sign({
            //     id: newUser.id,
            //     email: newUser.email,
            //     roles: newUser.roles
            // }, config.jwtPass, { expiresIn: '1 hour' });

            
    
            res.status(201).json({message: "L'utilisateur a bien été ajouté !"});
        }
    })
;

module.exports = router ;
