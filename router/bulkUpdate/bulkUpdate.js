const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb

// router.use('/addBulkCycleProduct',  (req, res, next)=>{ 
//     let db = getDb();
//     console.log(req.body)
//     // db.collection()
//     const array = req.body;
//     let slicedArray = []
//     for(let i=0;i<array.length;i++){
//         if(i!==0){
//             slicedArray.push(array[i])
//         }
//     }   

//     for(let j =0 ; j<array.length ; j++){
//         ((j)=>{
//             db.collection('cycles').insertOne({name: array[j][0], price: array[j][1], overprice: array[j][2] })

//         })(j)
//     }
//     res.send({status: 'foo'})
// })

router.use('/addBulkProduct', (req, res, next)=>{
    console.log('addBulkPRoduct');
    let {categories} = req.body.data;
    let db = getDb();
    if(categories === 'Cycle'){
        let userType = req.body.data.userType.split(',');
        db.collection('brand').findOne({name: `${req.body.data.brand}`}).then((brand)=>{
            db.collection('category').findOne({name: req.body.data.category, parentName: "Cycle"}).then((category)=>{
                db.collection('coupon').findOne({code: req.body.data.coupon}).then((coupon)=>{
                    let product = {...req.body.data};
                    let userTypes = [];
                    let coupons = [];
                    if(product.stock === 'Yes' || product.stock === 'yes' || product.stock === 'YES'){
                        product.stock = true
                    }else{
                        product.stock = false
                    }

                    if (product.emi === 'Yes' || product.emi === 'yes' ||  product.emi === 'YES'){
                        product.emi = true
                    }else{
                        product.emi = false
                    }
                    product.brand = {};
                    product.category = {};
                    product.userType = {};                
                    product.brand.label = req.body.data.brand;
                    product.brand.value = brand;
                    product.category.label = req.body.data.category;
                    product.category.value = category;
                    userType.forEach((singleItem)=>{
                        userTypes.push({label: singleItem, value: singleItem});
                    })
                    product.userType = userTypes;
                    // userType.forEach((singleItem, idx)=>{
                    //     product.userType[idx] = {label: singleItem, value: singleItem}
                    // })
                    coupons.push(coupon)
                    product.coupon = coupons
                    product.displayimages = req.body.image;
                    product.images = req.body.imageArray;
                    console.log(product)
                    db.collection('cycles').insertOne(product).then((response)=>{
                        console.log(response);
                    })
                    res.send({product: product})
                })
            })
        })
    } else if(categories === 'access'){
        db.collection('brand').findOne({name: req.body.data.brand}).then((brand)=>{
            db.collection('coupons').findOne({code: req.body.data.coupon}).then((coupon)=>{
                let product = {...req.body.data};
                let coupons = []
                product.brand = {};
                product.category = {};
                if(product.stock === 'Yes' || product.stock === 'yes' || product.stock === 'YES'){
                    product.stock = true
                }else{
                    product.stock = false
                }

                if (product.emi === 'Yes' || product.emi === 'yes' ||  product.emi === 'YES'){
                    product.emi = true
                }else{
                    product.emi = false
                }

                if(product.forProduct === 'Cycle'){
                    product.riderType = null
                }else if(product.forProduct === 'Rider'){
                    product.cycleType = null;
                }
                product.brand.label = req.body.data.brand;
                product.brand.value = brand;
                coupons.push(coupon)
                product.coupon = coupons;
                product.displayimages = req.body.image;
                product.images = req.body.imageArray;
                console.log(product);
                db.collection('cycles').insertOne(product).then((response)=>{
                    console.log(response);
                })
                res.send({product: product})
            })
        })      
    }else{
        db.collection('brand').findOne({name: req.body.data.brand}).then((brand)=>{
            db.collection('coupon').findOne({code: req.body.data.coupon}).then((coupon)=>{
                db.collection('category').findOne({name: req.body.data.category}).then((category)=>{
                    let product = {...req.body.data};
                    if(product.stock === 'Yes' || product.stock === 'yes' || product.stock === 'YES'){
                        product.stock = true;
                    }else {
                        product.stock = false;
                    }

                    if(product.emi === 'Yes' || product.emi === 'yes' || product.emi === 'YES'){
                        product.emi = true
                    }else{
                        product.emi = false;
                    }
                    product.brand = {};
                    product.category = {};
                    product.brand.label = req.body.data.brand;
                    product.brand.value = brand;
                    let coupons = []
                    coupons.push(coupon);
                    product.coupon = coupons;
                    product.category.label = req.body.data.category;
                    product.category.value = category;
                    product.displayimages = req.body.image;
                    product.images = req.body.imageArray;
                    console.log(product)
                    db.collection('cycles').insertOne(product).then((response)=>{
                        console.log(response)
                    })
                    res.send({product: product})
                })
            })
        })
    }

})

exports.bulkUpdate = router