const express = require('express');
const { getDb } = require('../../database/database');
const router = express.Router();

router.use('/locationAdd', (req, res, next) => {
    let db = getDb();
    const { circle, district, division, pincode, addedby } = req.headers;
    db.collection('location').insertOne({ addedby: addedby, circle: circle, district: district, division: division, pincode: pincode }).then((response) => {
        if (response) {
            res.send({status: 'suc', message: 'Location is inserted'})
        } else {
            res.send({status: 'error', message: 'Some error has occured'})
        }
    })
})

router.use('/pincodeCheckSmall', (req, res, next) => {
    const { pincode } = req.headers;
    let db = getDb();
    db.collection('location').find({ pincode: pincode }).toArray().then((response) => {
        if (response.length > 0) {
            res.send({status: 'suc', message: 'This location is Available'});
        } else {
            res.send({status: 'error', message: 'This location is not Deliverable'})
        }
    })
})

router.use('/pincodeCheck', (req, res, next) => {
    const { pincode } = req.headers;
    let db = getDb();
    db.collection('location').find({ pincode: pincode }).toArray().then((response) => {
        if (response.length > 0) {
            res.send({status: 'suc', message: 'This location is Available'});
        } else {
            res.send({status: 'error', message: 'This location is not deliverable make sure you are putting right pincode'})
        }
    })
})

exports.locationRouter = router