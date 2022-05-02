const express = require('express');
const getDb = require('../database/database').getDb;
const router = express.Router();


router.use('/accessoryDis', (req, res, next) => {
    let db = getDb();
    db.collection('accessories').find().toArray().then((response) => {
        res.send(response);
    })
})

exports.accessoryDis = router;