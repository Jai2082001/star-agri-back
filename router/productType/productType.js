const getDb = require('../../database/database').getDb;
const express = require('express');
const router = express.Router()

router.use('/addProductType', (req, res, next)=>{
    let db = getDb();
    const {name} = req.headers;
    db.collection('productType').find({name: name}).toArray().then((response)=>{
        if(response.length > 0){
            res.send({status: 'alreadyInserted'})
        }else{
            db.collection('productType').insertOne({name: name}).then((response)=>{
                let obj = {name: name}
                res.send(obj)
            })
        }
    })
    
})

router.use('/displayProductType', (req,res, next)=>{
    let db = getDb();
    db.collection('productType').find({}).toArray().then((response)=>{
        res.send(response)
    })  
})


exports.productType = router