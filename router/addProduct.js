const express = require('express');
const router = express.Router();
const getDb = require('../database/database').getDb;
const { ObjectId } = require('mongodb');

router.use('/addProduct', (req, res, next) => {
    let db = getDb();
    let { categories } = req.body;
    let { name } = req.body;
    const { category } = req.body;
    db.collection('seeds').find({ name: name }).toArray().then((response) => {
        if (response.length) {
            res.send({ status: 'error' })
        } else {

            const { name, price, coupon, char, spec, brand, desc, emi, overprice, images, displayimages, stock, quantity, categories, width, lenght, height, weight, gst, hsn, level, level2, season } = req.body


            db.collection('seeds').insertOne({ name: name, price: price, coupon: coupon, brand: brand, desc: desc, emi: emi, overprice: overprice, images: images, displayimages: displayimages, stock: stock, quantity: quantity, categories: categories, category: category, weight: weight, height: height, lenght: lenght, width: width, gst: gst, hsn: hsn, level: level, level2: level2, char: char, spec: spec, season: season }).then((response) => {
                res.send({ status: true })

            })
        }
    })
})

router.use('/productDisplayWholeSeeds', (req,res, next)=>{
    let db = getDb();
    db.collection('seeds').find({}).toArray().then((response)=>{
        res.send(response);
    })
})

router.use('/updateProduct', (req, res, next) => {
    let db = getDb();
    let { name, price, overprice, desc, categories, stock, coupon, emi, quantity, category, brand,  } = req.body;
    let { id } = req.body;
    let { descPoint1, descPoint2, descPoint3, descPoint4 } = req.body;
    console.log('update Product')
    db.collection('seeds').updateOne({ _id: new ObjectId(id) }, {
        $set: {
            name: name,
            price: price,
            overprice: overprice,
            desc: desc,
            stock: stock,
            emi: emi,
            quantity: quantity,
            brand: brand,
            descPoint1: descPoint1,
            descPoint2: descPoint2,
            descPoint3: descPoint3,
            descPoint4: descPoint4,
            category: category,
            categories: categories,
            coupon: coupon
        }
    }).then((response) => {
        res.send(response)
    })
})

router.use('/updatePrimaryImage', (req, res, next)=>{
    let db = getDb();
    let {img, product} = req.body;
    console.log(req.body.img)
    db.collection('seeds').updateOne({_id: new ObjectId(product._id)}, {
        $set: {
            displayimages: img    
        }
    }).then((response)=>{
        console.log(response)
        res.send(response)
    })
})


router.use('/updateSecImage', (req, res, next)=>{
    let db = getDb();
    let {img, product} = req.body;
    console.log(req.body.img);
    db.collection('seeds').updateOne({_id: new ObjectId(product._id)}, {
        $set: {
            images: img
        }
    }).then((response)=>{
        console.log(response)
        res.send(response)
    })
})
exports.addProduct = router;














// if(product === 'Cycle'){
//     let {weight, suspension, rear, front, gear , wheel, userType, frame} = req.body;
//     db.collection('cycles').updateOne({_id: new ObjectId(id)}, {$set: {
//         name: name,
//         price: price,
//         overprice: overprice,
//         desc: desc,
//         categories: categories,
//         stock: stock,
//         coupon: coupon,
//         emi: emi,
//         quantity: quantity,
//         category: category,
//         brand: brand,
//         weight: weight,
//         "suspension": suspension,
//         "wheel size": wheel,
//         "rear deraileur": rear,
//         "front deraileur": front,
//         "frame material": frame,
//         "no. of gears": gear,
//         userType: userType
//     }}).then((response)=>{
//         res.send(response)
//     })
// } else if(product === 'access'){
//     let {descPoint1, descPoint2, descPoint3, descPoint4, riderType, cycleType, forProduct} = req.body    
//     db.collection('cycles').updateOne({_id: new ObjectId(id)}, {$set: {
//         name: name,
//         price: price,
//         overprice: overprice,
//         desc: desc,
//         categories: categories,
//         stock: stock,
//         coupon: coupon,
//         emi: emi,
//         quantity: quantity,
//         category: category,
//         brand: brand,
//         descPoint1: descPoint1,
//         descPoint2: descPoint2,
//         descPoint3: descPoint3,
//         descPoint4: descPoint4,
//         riderType: riderType,
//         cycleType: cycleType,
//         forProduct: forProduct
//     }}).then((response)=>{
//         res.send(response)
//     })
// }else{

    //db.collection('cycles').updateOne({_id: new ObjectId(id)}, {$set: {
        //     name: name,
        //     price: price,
        //     type: type,
        //     category: category,
        //     desc: desc,
        //     coupon: coupon,
        //     overprice: overprice,
        //     emi: emi,
        //     brand: brand,
        //     stock: stock,
        //     quantity: quantity
        // }}).then((response)=>{
        //     console.log(response)
        //     res.send(response)
        // })
        // // db.collection('cycles').find({ _id: ObjectId(id) }).toArray().then((response) => {
        // //     if (response.length > 0) {
        // //         db.collection('cycles').updateOne({ _id: id }, {
        // //             $set: {
        // //                 name: name,
        // //                 price: price,
        // //                 type: type,
        // //                 category: category,
        // //                 desc: desc,
        // //                 coupon: coupon,
        // //                 overprice: overprice,
        // //                 emi: emi,
        // //                 brand: brand,
        // //                 stock: stock
        // //             }
        // //         }).then((response) => {
        // //             console.log(response)
        // //             if (response) {
        // //                 res.send(response);
        // //             } else {
        // //                 res.send({status: 'Some Error Has Occured'})
        // //             }
        // //         })
        // //     } else {
        // //         res.send({status: 'Not in the Database'})
        // //     }