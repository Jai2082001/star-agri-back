const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const {ObjectId} = require('mongodb');


router.use('/productStruct', (req, res, next)=>{
    let db = getDb();
    let {productType, category} = req.body;
    let length = category.length;
    let index = 0;
    category.map((singleItem)=>{
        db.collection('category').find({name: singleItem.name, parentName: productType}).toArray().then((response)=>{
            if(response.length > 0){
                res.send({status: 'Already a product category combinationn'})
            }else{
                db.collection('category').insertOne({parentName: productType, name: singleItem.name, img: singleItem.img, addedby: 'admin', filterArray: singleItem.filterArray}).then((response)=>{
                    index++
                    if(index === category.length){
                        res.send({status: "done"})
                    }
                })
            }
        })        
        })
})

router.use('/addProductSeed', (req, res, next)=>{
    let db = getDb();
    let {producttype} = req.headers;
    db.collection('category').insertOne({productType: producttype}).then((response)=>{
        console.log(response);
        res.send({name: producttype});
    })
})

router.use('/productStructSeed', (req, res, next)=>{
    let db = getDb();
    let {level, level1, level2, productType} = req.body;
    
    if(level.length>0){
        let init = 0;
        level.map((singleItem)=>{
            let obj = singleItem;
            obj.parentName = productType;
            db.collection("category").updateOne({productType: productType}, {$push: {
                category: obj
            }}).then((response)=>{
                init = init + 1;
                if(init === level.length ){
                    if(level1.length > 0){
                        let parentArray = [];
                        db.collection("category").findOne({productType: productType}).then((response)=>{
                            level1.map((singleItem)=>{
                                for(let i = 0;i<response.category.length;i++){
                                    if(response.category[i].name === singleItem.parentName){
                                       if(response.category[i].category){
                                           response.category[i].category.push(singleItem)
                                       } else{
                                           let newarray = [];
                                           newarray.push(singleItem)
                                           response.category[i].category = newarray
                                       }
                                    }
                                }
                            })        

                            db.collection("category").updateOne({productType: productType}, {$set: {category: response.category}}).then((response)=>{
                                res.send({status: "done"})
                            })
                        })
                        
                    }else{
                        res.send({status: 'done'})
                    }
                }
            })    
        })

    }else{
        res.send({status: 'done'})
    }
    
    console.log(req.body)
})

router.use('/filterDesc', (req, res, next)=>{
    let db = getDb();
    let {stocktype, filtervalue} = req.headers;
    db.collection('category').findOne({name: filtervalue, parentName: stocktype}).then((response)=>{
        console.log(response)
        res.send({array: response.filterArray})
    })

})


exports.productStruct = router
