const express = require('express');
const getDb = require('../database/database').getDb;
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/userSignUp', (req, res, next) => {
    let db = getDb();
    db.collection('users').insertOne(req.body).then((response) => {
        const token = jwt.sign({_id: response.insertedId}, "my secret key")
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24*60*60*1000
        })

        res.send('done')
    })
})


exports.signUpUser = router