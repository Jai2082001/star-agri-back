const express = require('express');
const getDb = require('../../database/database').getDb;
const router = express.Router();

router.use('/imgDisplay', (req, res, next)=>{
    let db = getDb()
    db.collection('images').find({}).toArray().then((response)=>{
        res.send(response)
    })
})

router.use('/imgSliderDisplay', (req, res, next)=>{
    let db = getDb();
    console.log("image slider")
    db.collection('image').findOne({}).then((response)=>{
        console.log(response)
        if(response){
            res.send({images: response.sliderImg})
        }
        else{
            console.log(response)
        }
    })
})

router.use('/imgAddSlider', (req, res, next)=>{
    let db = getDb();
    let {img, product} = req.body;
    db.collection('image').findOne({}).then((response)=>{
        if(response && response.sliderImg.length >= 5){
            res.send({status: 'Images Capacity Reached ', nature: 'error'})
        }else{
            db.collection('image').updateOne({}, {
                $push: {
                    "sliderImg": {img: img, product: product.value}
                }
            })
        }
    })
})

router.use('/imgRemove', (req, res, next)=>{
    let db = getDb();
    let {removeid} = req.headers;
    db.collection('image').findOne({}).then((response)=>{
        let newArray = []

        if(response.sliderImg.length > 1){
            for(let i=0;i<response.sliderImg.length;i++){
                if(i !== parseInt(removeid)){
                    newArray.push(response.sliderImg[i])
                }
            }
    
            db.collection('image').updateOne({}, {
                $set: {
                    sliderImg: newArray
                }
            }).then((response)=>{
                res.send(response)
            })
        }else{
            res.send({status: 'Image Array Should Have Atleast One Image', nature: 'error'})
        }
        
    })

})


router.use('/bannerImg3', (req, res, next)=>{
    let db = getDb();
    db.collection('image').findOne({}).then((response)=>{
        if(response){
            const array = [];
            array.push(response.up3)
            array.push(response.up4)
            array.push(response.up5)
            res.send({images: array})
        }
    })
})

router.use('/bannerImg2', (req, res, next)=>{
    let db = getDb();
    db.collection('image').findOne({}).then((response)=>{
        if(response){
            const array = [];
            array.push(response.up1)
            array.push(response.up2)
            res.send({images: array})
        }
    })
})

router.use('/imgUpdate' , (req, res, next)=>{
    let db = getDb();
    const {img} = req.body
    const {updateid} = req.headers
    let updateObj2  = {};
    let updateObj = {};
    updateObj2[`up${updateid}`] = img
    updateObj['$set'] = updateObj2   
    db.collection('image').updateOne({}, updateObj).then((response)=>{
        res.send(response)
    })
})

exports.image = router