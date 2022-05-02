const express = require('express');
const router = express.Router();
const getDb = require('../database/database').getDb;

router.use('/getProduct', (req, res, next) => {
    let db = getDb();
    
    db.collection('products').find().toArray().then((response) => {
        res.send(response)
    })
})

exports.getProducts = router