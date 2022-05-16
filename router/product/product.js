const { response } = require('express');
const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const {ObjectId} = require("mongodb")


router.get('/productDisplayWithId', (req, res, next)=>{
    let db = getDb();
    let {productid} = req.headers;

    db.collection("seeds").findOne({_id: new ObjectId(productid)}).then((response)=>{
        res.send({product: response})
    })    
})

router.get('/productDisplayWithFilter', (req, res, next)=>{
    let db = getDb();
    const {filtertype, stocktype, filter} = req.headers;

    if(filtertype !== 'undefined'){
        let stock;
        if(stocktype === 'cycles'){
            stock = 'Cycle'
        }else if(stocktype === 'accessories'){
            stock = 'access'
        }
        else{
            stock = stocktype
        }
        const query = {
            categories: stock
        }
        query[filtertype] = filter
        if(filtertype === 'users'){
            db.collection('cycles').find({categories: stock}).toArray().then((response)=>{
                let sendingArray = [];
                response.map((singleItem)=>{
                    let flag = 0;
                    singleItem.userType.map((singleItem2)=>{
                        if(singleItem2.label === filter){
                            flag++
                            return
                        }
                    })
                    if(flag){
                        sendingArray.push(singleItem)
                    }
                })
                res.send(sendingArray)
            })
        }
        if(filtertype === 'category'){
            db.collection('cycles').find({categories: stock}).toArray().then((response)=>{
                let sendingArray = [];
                response.map((item)=>{
                    if(item.category.label === filter){
                        sendingArray.push(item)
                    }
                })
                res.send(sendingArray)
            })
        }

        if(filtertype === 'brand'){
            db.collection('cycles').find({categories: stock}).toArray().then((response)=>{
                let sendingArray = [];
                response.map((singleItem)=>{
                    if(singleItem.brand.label === filter){
                        sendingArray.push(singleItem);
                    }
                })
                res.send(sendingArray)
            })
        }

    }else {
        if(stocktype !== 'undefined'){
            let stock;
            if(stocktype === 'cycles'){
                stock = 'Cycle'
            }else{
                stock = 'access'
            }
            db.collection('cycles').find({categories: stock}).toArray().then((response)=>{
                res.send(response)
            })
        }
    }
    
    
})

router.use(`/productNew`, (req, res, next)=>{
    let db = getDb();
    db.collection("seeds").find({}).toArray().then((response)=>{
        res.send({records: response})
    })
})


router.use('/productNames', (req, res, next)=>{
    let db = getDb();
    const products = [];
    db.collection('cycles').find({}).toArray().then((response)=>{
        response.map((singleItem)=>{
            products.push(singleItem.name);
        })
        res.send(products)
    })
})


router.use('/productDisplay', (req, res, next)=>{
    let db = getDb();
    let {name} = req.headers;
    db.collection('cycles').findOne({name: name }).then((response)=>{
        res.send({product: response})
    })
})


router.use('/categoryDisplaySeed', (req, res, next)=>{
    let db = getDb();
    let {name, parentname} = req.headers;
    
    if(name === 'undefined'){
        const obj = {};
        obj[`level.name`] = parentname;
        db.collection('seeds').find(obj).toArray().then((response)=>{
            res.send(response)
        })
    }else{
        const obj = {}
        obj['level.name'] = parentname;
        obj['level2.name'] = name;
        db.collection('seeds').find(obj).toArray().then((response)=>{
            res.send(response)
        })
    }
})



router.use('/seasonalOrder', (req, res, next)=>{
    let db = getDb();
    const date = new Date();
    const dateArray = date.toLocaleDateString().split("/")
    let season = '';
    if(parseInt(dateArray[1]) >= 1 && parseInt(dateArray[1]) <= 3){
        season = 'Summer'
    }else if(parseInt(dateArray[1]) === 4){
        if(parseInt(dateArray[0]) <= 15){
            season = 'Summer'
        }else{
            season = 'Kharif';    
        }
    }else if(parseInt(dateArray[1]) >= 5 && parseInt(dateArray[1]) <= 7 ){
        season = "Kharif"
    }else if(parseInt(dateArray[0]) === 8){
        if(parseInt(dateArray[0]) <= 15){
            season = 'Kharif'
        }else{
            season = 'Rabi'    
        }
    }else if(parseInt(dateArray[0]) >= 9){
        season = "Rabi"
    }
    

    db.collection('seeds').find({season: season}).toArray().then((response)=>{
        res.send(response)
    })

})



router.get('/productDisplayWhole', (req, res, next)=>{
    let db = getDb();
    db.collection('seeds').find().toArray().then((response)=>{
        res.send(response)
    })
})

router.get('/productDisplayWholeSub', (req, res, next)=>{
    let db = getDb();
    db.collection('cycles').find({addedby: req.headers.subid}).toArray().then((response)=>{
        res.send(response)
    })
})

router.get('/productDisplayLatest', (req, res, next) => {
    let db = getDb();
    db.collection('cycles').find({}).sort({ _id: -1 }).limit(5).toArray().then((response) => {
        res.send(response)
    })

})

router.get('/productDisplayLimit', (req, res, next) => {
    let db = getDb();
    let limitHeader = parseInt(req.headers.limit);
    db.collection('cycles').find({}).limit(limitHeader).toArray().then((response) => {
        res.send(response)
    })
})


exports.product = router