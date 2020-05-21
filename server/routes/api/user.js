const express = require('express');
const userModel = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const router = express.Router();
const {check, validationResult} = require('express-validator');

//api for user registration
router.post('/register',
[
    check('name', 'Name is required').Not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Plrase enter a password with 6 or more characters').isLength({min:6})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;

    try{
        let user = await userModel.findOne({email});

        if(user){
            return res.status(400).json({errors:[{msg:'User already exists'}]});
        }

        user = new userModel({
            name, email, password
        });

        await user.save();

        const payload = {
            user:{
                id:user.id,
                name:user.name
            }
        };

        jwt.sign(payload, config.get('jwtSecret'),{espiresIn:'1h'},
        (err, token) =>{
            if(err) throw err;
            return res.status(200).json({data:{user, token}});
        });
    }catch(err){
        res.status(500).send('Server error');
    }

});

//api for login
router.post('/login', async (req, res, next) => {
    const {email, password} = req,body;

    await userModel.findOne({email}, function(err, userInfo){
        if (err){
            next(err);
        } else {
            if (bcrypt.compareSync(password, userInfo.password)){
                const payload = {
                    user:{
                        id:userInfo.id,
                        name:userInfo.name
                    }
                };
                const token = jwt.sign(payload, config.get('jwtSecret'), {expirseIn: '1h'});
                res.json({status:'success', data:{id:userInfo._id, name:userInfo.name, email:userInfo.email, token}});
            } else {
                res.json({status:'error', message:'Invalid Username/Password', data:null});
            }
        }
    });
});
module.exports = router;