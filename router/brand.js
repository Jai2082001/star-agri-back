const express = require('express');
const getDb = require('../database/database').getDb;
const router = express.Router();

router.use('/brandDisplay', (req, res, next) => {
    let db = getDb();
    db.collection('brand').find({}).toArray().then((response) => {
        if (response) {
            res.send(response);
        } else {
            res.send({status: "No Brand Names"})
        }
    })
})


router.use('/brandDisplaySub', (req, res, next)=>{
    let db = getDb();
    const {subid} = req.headers; 
    db.collection('brand').find({addedby: subid}).toArray().then((response)=>{
        res.send(response)
    })
})

router.use('/brandAddSub', (req, res, next)=>{
    let db = getDb();
    const {subid, name, subname, imgFile} = req.body;
    db.collection('brand').insertOne({name: name, subName: subname, imgFile: imgFile, addedby: subid}).then((response)=>{
        res.send(response)
    })
})

router.use('/brandCycles', (req, res, next)=>{
    let db = getDb();
    db.collection('cycles').find({}).toArray().then((response)=>{
        let unif = {};
        response.forEach((singleItem)=>{
            unif[singleItem.categories] = [] 
        })
        response.forEach((singleItem)=>{
            if(singleItem.brand){
                if(!(unif[singleItem.categories].includes(singleItem.brand.label))){
                    unif[singleItem.categories].push(singleItem.brand.label)
                }    
            }
        })    
        res.send({array: unif}) 
    })
})

exports.brandName = router;




// ;router.use('/productDis', (req, res, next)=>{
//     console.log('product Dis')
//     let db = getDb()
//     db.collection('cycles').find({}).toArray().then((response)=>{
//         res.send(response)
//     })
// })

// router.get('/productDisplayLimit', (req, res, next) => {
//     let db = getDb();
//     let limitHeader = parseInt(req.headers.limit);
//     db.collection('cycles').find({}).limit(limitHeader).toArray().then((response) => {
//         res.send(response)
//     })
// })