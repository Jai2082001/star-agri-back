const express = require('express');
const getDb = require('../database/database').getDb;
const router = express.Router();


router.use('/brandAdd', (req, res, next) => {
    let db = getDb();
    let { name, subName, imgFile } = req.body;
    let { addedby } = req.headers;
    db.collection('brand').find({ name: name, subName: subName }).toArray().then((response) => {
        if (response.length > 0) {
            res.send({ status: 'Already Inputed' })
        }
        else {
            db.collection('brand').insertOne({ name: name, subName: subName, imgFile: imgFile, addedby: addedby }).then((response) => {
                res.send(response)
            })
        }
   })
    
})

exports.brandAdd = router