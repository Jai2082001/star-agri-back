const express = require('express');
const router = express.Router();
const getDb = require('../database/database').getDb;


router.use('/categoryAdd', (req, res, next) => {
    let db = getDb();
    let {name, img, parentName} = req.body;
    let {addedby} = req.headers
    db.collection('category').find({ name: name, parentName: parentName }).toArray().then((response) => {
        if (response.length>0) {
            res.send({status: 'Already In Database'})
        } else {
            db.collection('category').insertOne({ parentName: parentName, name: name , img: img, addedby: addedby}).then((response) => {
                res.send(response);
        })    
        }
    })
})

router.use('/categoryDisplaySub', (req, res, next)=>{
    let db = getDb();
    let {addedby} = req.headers;
    db.collection('category').find({addedby}).toArray().then((response)=>{
        res.send(response);
    })
})

router.use('/categoryAddSub', (req, res, next)=>{
    let db = getDb();
    let {name, img} = req.body;
    let {addedby} = req.headers;
    db.collection('category').insertOne({name: name, img: img, addedby: addedby}).then((response)=>{
        res.send(response)
    })
})

router.use('/categoriesDisplay', (req, res, next)=>{
    let db = getDb();
    let {single} = req.headers;
    db.collection('category').find({parentName: single}).toArray().then((response)=>{
        res.send(response)
    })
})

router.use('/categoryDisplay', (req, res, next) => {
    let db = getDb();
    db.collection('category').find().toArray().then((response) => {
        res.send(response)  
    })
})

exports.categoryAdd = router