const express = require('express');
const { Db } = require('mongodb');
const router = express.Router();
const getDb = require('../database/database').getDb;


router.use('/saleStats', (req, res, next)=>{
    let db = getDb();
    console.log('Sale Statistics');
    let object = {};
    object['jan'] = 0;
    object['feb'] = 0;
    object['mar'] = 0;
    object['apr'] = 0;
    object['may'] = 0;
    object['jun'] = 0;
    object['jul'] = 0;
    object['aug'] = 0;
    object['sep'] = 0;
    object['oct'] = 0;
    object['nov'] = 0;
    object['dec'] = 0
    db.collection('orders').find().toArray().then((response)=>{
        resposne.map()
    })
})