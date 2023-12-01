const express = require('express');
const router = express.Router();
const { getDb } = require('../../database/database')
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

router.use('/registerUserSignUp', (req, res, next) => {
    let db = getDb();
    console.log(req.body)
    const {name, email, number, password, state, city, address, alternatenum, pincode} = req.body
    db.collection('users').findOne({email: email}).then((response)=>{
        if(response){
            res.send({status: "Email already in use"})
        }else{
            db.collection('users').findOne({number: number}).then((response)=>{
                if(response){
                    res.send({status: "Phone Number already in use"})
                }else{
                    
                    db.collection('users').insertOne({ name: name, email: email, number: number, password: password }).then((response) => {
                        
                        // console.log(response.insertedId);
                        // db.collection('users').findOne({_id: response.insertedId}).then((response)=>{
                        //     console.log(response)
                        // })
                        db.collection('address').insertOne({fullname: name, number: number, state: state, city: city, address: address, alternatenum: null, pincode: pincode}).then((response1)=>{
                            db.collection('users').updateOne({_id: response.insertedId}, {
                                $push: {
                                    address: response1.insertedId
                                }
                            }).then((response)=>{
                                console.log(response)
                                res.send({status: 'insertedUser'})
                            })
                        })

                    })
                }
            })
        }
    })

})

router.use('/updateUser', (req, res, next)=>{
    let db = getDb();
    const {name, email, number, id} = req.headers;
    db.collection('users').updateOne({_id: new ObjectId(id)}, {
        $set: {
            name: name,
            email: email,
            number: number   
        }
    }).then((response)=>{
        res.send(response)
    })
})

router.use('/logoutUser', (req, res, next)=>{
    res.cookie('jwt', '', {
        expires: 0,
        httpOnly: true,
    })
    res.status(200).json({ success: true, message: 'User logged out successfully' })
})

router.use('/loginUser', (req, res, next) => {
    let db = getDb();
    const { email, password, src } = req.headers;

    if(src === 'email'){
        db.collection('users').findOne({ email: email, password: password }).then((response) => {
            if (response) {
                // const token = response._id
                // res.cookie('jwt', token)
                res.send(response)
            } else {
                res.send({message: 'no authentication'})
            }
        })
    }else{
        db.collection('users').findOne({ number: email, password: password }).then((response) => {
            if (response) {
                // const token = response._id
                // res.cookie('jwt', token)
                res.send(response)
            } else {
                res.send({message: 'no authentication'})
            }
        })
    }

    
})

router.use('/userAuthenticated', (req, res, next) => {
    // const cookie = req.cookies['jwt'];
    // const cookie2 = req.cookies;
    const cookie = req.headers.jwt;
    let db = getDb();
    if(cookie && cookie !== 'undefined'){
        const myId = new ObjectId(cookie);
        db.collection('users').findOne({ _id: myId }).then((response) => {
            if (response) {
             res.send(response);        
            } else {
                res.send({status: 'not logged in'})
            }
        })
    }else{
        res.send({status: 'not logged in'})
    }
   
})

router.use('/addUserAddress', (req, res, next) => {
    const cookie = req.headers.jwt;

    if (!cookie) {
        return res.send({status: 'not logged in'})      
    }    
    if (cookie === 'undefined'){
        return res.send({status:  'not logged in'})
    }
    else{
        let db = getDb();
        const { fullname, city, number, state, address, alternatenum, pincode } = req.headers;
        db.collection('address').insertOne({ fullname: fullname, number: number, state: state, address: address, alternatenum: alternatenum, pincode: pincode, city: city }).then((response) => {
        db.collection('users').updateOne({ _id: new ObjectId(cookie) }, {
        $push: {
            address: response.insertedId 
        }
        }).then((response) => {
            res.send(response)
        })
    })
    }
    
})

exports.registerUser = router