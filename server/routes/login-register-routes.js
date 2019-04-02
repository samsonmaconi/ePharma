const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
var passport = require('passport');
const authentication = require('../middleware/authentication');


router.post('/register',(req,res,next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                confirmPassword: hash,
                Address1: req.body.Address1,
                Address2: req.body.Address2,
                city: req.body.city,
                postalCode: req.body.postalCode
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'User created',
                        result: result
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

router.post('/login',(req,res,next) => {
    let newUser;
    User.findOne({
        email: req.body.email
    }).then(user =>{
        if(!user){
            return res.status(401).json({
                message: 'Authentication fail!'
            });
        }
        newUser = user;

       return bcrypt.compare(req.body.password, user.password);
    }).then(result =>{
        if(!result){
            return res.status(401).json({
                message: 'Authentication fail!'
            });
        }
        const token = jwt.sign({
            email: newUser.email,
            userId: newUser._id
        },
        'secret_long_token_only_for_developers',
        {expiresIn: '1h'});
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            fname: newUser.firstName,
            _id: newUser._id,
            email: newUser.email
        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Authentication fail!'
        });
    });
});


router.get('/:id',(req,res,next)=>{
    const id = req.params.id;
    User.findById(id).exec()
        .then(response =>{
            res.status(200).json(response);
            //console.log(response);
        }).catch(err =>{
            console.log(err);
        });
});

router.get('/',(req,res,next)=> {
    User.find((err,user)=>{
        if(!err){
            res.send(user);
        }
        else {
            console.log("error in getting data");
            res.send(err);
        }
    });
});
router.put('/:id', (req,res) => {
    console.log("Update data");
    var userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        Address1: req.body.Address1,
        Address2: req.body.Address2,
        city: req.body.city,
        postalCode: req.body.postalCode
    };
    User.findByIdAndUpdate(req.params.id,{$set: userData}, {new: true},(err, updatedData)=>{
        if(!err){
            res.send(updatedData);
        }
        else{
            console.log("err");
            res.send(err);
        }
    });
});


module.exports = router;