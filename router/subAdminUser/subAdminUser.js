const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb 

router.use('/loginSubAdmin', (req, res, next) => {
    let db = getDb();
})
router.use('/registerSubAdmin', (req, res, next) => {
    let db = getDb()
})

exports.subAdminRouter = router