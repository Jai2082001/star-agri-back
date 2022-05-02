const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;


router.use('/couponDisplay', (req, res, next) => {
    let db = getDb();

    db.collection('coupon').find().toArray().then((response) => {
        res.send(response)
    
    })
})

router.use('/couponEdit', (req, res, next) => {
    let db = getDb();
    let { code, price } = req.headers;
    db.collection('coupon').find().toArray().then((response) => {
        if (response.length) {
            db.collection('coupon').updateOne({ code: code }, { $set: { percent: price } }).then((response) => {
                res.send(response)
            })
        } else {
            res.send({status: 'Not in Database'})
        }
    })
})

router.use('/couponAdd', (req, res, next) => {
    let db = getDb();
    const { code, price, addedby } = req.headers;
    db.collection('coupon').find({ code: code }).toArray().then((response) => { 
        if (response.length === 0) {
            db.collection('coupon').insertOne({ code: code, percent: price, addedby: addedby }).then((response) => {
                res.send(response)    
            })
        }else {
            res.send({status: 'Coupon Already Added'})
        }
    })
})

router.use('/couponRemove', (req, res, next) => {
    let db = getDb();
    const { code } = req.headers;
    db.collection('coupon').find({ code: code }).toArray().then((response) => {
        if (!(response.length)) {
            res.send({status: 'Coupon Not In The Database'})
        
        } else {
            db.collection('coupon').deleteOne({code: code}).then((response) => {
                res.send(response);
             })
        }
    })
})

exports.coupon = router;