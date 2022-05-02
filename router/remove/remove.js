const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const {ObjectId} = require('mongodb');


router.use('/removeProduct', (req, res, next)=>{
    let db = getDb();
    let {value} = req.body;
    db.collection('cycles').deleteOne({"_id": new ObjectId(value._id)}).then((response)=>{
        res.send({response: response})
    })
})


exports.remove = router 