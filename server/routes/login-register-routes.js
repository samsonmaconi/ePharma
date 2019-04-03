const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const async = require('async');
// const objid = mongoose.Types.ObjectId;
const nodemailer = require('nodemailer');
const crypto = require('crypto');


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

// forgot password

router.post('/forgot/:email',(req,res,next)=>{
    async.waterfall([
        function(done){
            crypto.randomBytes(20, (err,bufferSize) =>{
                var token = bufferSize.toString('hex');
                done(err,token);
            });
        },
        function(token,done){
            User.findOne({email: req.params.email},(err,user)=>{
                if(!user){
                    console.log("error in fetching user", err);
                    res.send(err);
                }
                user.resetPwdToken = token;
                user.resetPwdExpiry = Date.now() + 3600000;
                user.save((err)=>{
                    done(err,token,user);
                });
            });
        },
        function(token,user,done){
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'epharma.helpdesk@gmail.com',
                    pass: 'epharma@123'
                }
            });
            var data = req.body;
            var mailOptions = {
                from: 'epharma.helpdesk@gmail.com',
                to: user.email,
                subject: 'E-Pharma password recovery',
                text: 'To reset password click below \n\n'+
                'http://localhost:4200/reset-pwd?q='+user._id
            };
            transporter.sendMail(mailOptions, (err)=>{

                console.log(user.email);
                if(err){
                    console.log('error in sending mail', err);
                }
                console.log('mail sent');
                console.log('Data', data.firstName);
            });
        }
    ],(err)=>{
        return res.status(422).json({
            message: err
        });
    });
});

router.get('/reset-pwd',(req,res)=>{
    User.findOne({
        resetPwdToken: req.params.token,
        resetPwdExpiry: {$gt: Date.now()}

    }, (err,user)=>{
        if(!user){
            res.status(404).json({
                message: 'User not found'
            });
        }else{
            console.log('Success');
        }
    });
});

router.put('/reset-pwd/:id',(req,res,next)=>{
    var details = {
        id: req.params.id,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    User.findByIdAndUpdate(req.params.id, {$set: details},{new: true},(err,doc)=>{
        if(!err){
            console.log('details',details);
            res.send(doc);
        }else{
            console.log('error in saving');
        }
    })
    .catch(err=>{
        console.log('err',err);
    });
});

module.exports = router;