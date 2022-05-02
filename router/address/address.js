const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const { ObjectId } = require('mongodb');

router.use('/addressDisplay', (req, res, next) => {
    if (req.headers.address) {
        const id = new ObjectId(req.headers.address);
        let db = getDb();
        db.collection('address').findOne({ _id: id }).then((response) => {
        if (response) {
            res.send(response)            
        } else {
            res.send({ status: 'Not Available' })
        }

        })    
    } else {
        res.send({status: "Not available"})
    }
        
})

router.use('/changeProfile', (req, res, next)=>{
    let {pincode, fullname, id, state, number, alternate, city, address} = req.headers;
    let db = getDb();
    db.collection('address').updateOne({_id: new ObjectId(id)}, {$set: {
        pincode: pincode,
        fullname: fullname,
        number: number,
        state: state,
        address: address,
        alternatenum: alternate,
        city: city
    }}).then((response)=> {
        res.send(response)
    })
})

router.use('/deleteAddress', (req, res, next)=>{
    let {id} = req.headers;
    let db  = getDb();
    db.collection('address').deleteOne({_id: new ObjectId(id)}).then((response)=>{
        res.send(response)
    })
})

exports.address = router