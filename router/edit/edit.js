const express = require('express');
const {getDb} = require('../../database/database');
const router = express.Router();
const {ObjectId} = require('mongodb');

router.use('/changeProfile', (req, res, next)=>{
    let db = getDb();
    let {pincode, fullname, id, state, number, alternate, city, address} = req.headers;
    db.collection('address').findOne({id: new ObjectId(id)}).then((response)=>{
        let newCart = [];
        db.collection('address').updateOne({id: new ObjectId(id)}, {
            $set: {
                pincode: pincode,
                fullname: fullname,
                number: number,
                alternatenum: alternate,
                city: city,
                state: state,
                address: address
            }
        }).then((response)=>{
            res.send(response)
        })

    })  
})