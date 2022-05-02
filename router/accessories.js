const express = require('express');
const getdb = require('../database/database').getDb
const router = express.Router();

router.use('/accessoriesAdd', (req, res, next) => {
    let db = getdb();
    const { brand, coupon, ridertype, cycletype, price, desc, overprice, images, displayimages } = req.body;
    db.collection('accessories').insertOne({ price: price, desc: desc, overprice: overprice, accessory: req.body.accessory, brand: brand, riderType: ridertype, coupon: coupon, cycleType: cycletype, type: req.body.type, images: images, displayimages: displayimages }).then((response) => {
        res.send(response);
    })
})

exports.accessoriesAdd = router;