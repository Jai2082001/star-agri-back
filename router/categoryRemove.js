const express = require('express');
const getDb = require('../database/database').getDb;
const router = express.Router();

router.use('/categoryRemove', (req, res, next) => {
    let db = getDb();
    db.collection('category').deleteOne({ name: req.headers.name }).then((response) => {
        res.send(response)
    })
})

exports.categoryRemove = router