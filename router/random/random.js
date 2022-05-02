const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;


router.use('/randomDisplay', (req,res, next)=>{
    let db = getDb();
    let num = parseInt(req.headers.numbers)
    // db.collection('cycles').aggregate([{ $sample: { size: 1 } }]).then((response)=>{
    //     console.log(response)
    // })
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    db.collection('cycles').find({}).toArray().then((response)=>{
        if(response){{
            let array = [];
            let dataArray = [];
            while(true){
                if(array.length>=num || array.length === response.length){
                    break;
                }
                let integer =  getRndInteger(0, response.length) 
                if(!array.includes(integer)){
                    array.push(integer)
                }
            }

            for(let i=0;i<array.length;i++){
                dataArray.push(response[array[i]])
            }
            res.send(dataArray)
        }}else{
            res.send({message: 'no Data'})
        }
    }) 
})


exports.random = router