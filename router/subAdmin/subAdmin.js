const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId; 


router.use('/addSubAdmin', (req, res, next) => {
    let db = getDb();
    const { phonenumber, email, productedit, categoryedit, couponedit, brandedit, username, password, removeedit } = req.headers
    db.collection('subAdmins').find({ username: username }).toArray().then((response) => {
        if (res.length > 0) {
            res.send({status: 'Already Added In the database'})
        } else {
            db.collection('subAdmins').insertOne({phonenumber: phonenumber, username: username, email: email, categoryedit: categoryedit, couponedit: couponedit, brandedit: brandedit, productedit: productedit, password: password, removeedit: removeedit}).then((response) => {
            if (response) {
                res.send({status: 'Added'})
            } else {
                res.send({status: 'SomeErrorOccured'})
            }
        })          
    }
    })
})


router.use('/subAdminAuthentication', (req, res, next)=>{
    let db = getDb();
    const cookie = req.cookies['sub'];
    const myId = new ObjectId(cookie);
    db.collection('subAdmins').findOne({ _id: myId }).then((response) => {
        if (response) {
         res.send(response);        
        } else {
            res.send({status: 'not logged in'})
        }
    })
})


router.use('/getSubAdmin', (req, res, next) => {
    let db = getDb();
    db.collection('subAdmins').find().toArray().then((response) => {
        res.send(response);
    })
})

router.use('/deleteSubAdmin', (req, res, next) => {
    let db = getDb();
    const { username } = req.headers;
    db.collection('subAdmins').deleteOne({ username: username }).then((response) => {
        if (response) {
            res.send({ status: 'Deleted The Record' });
        } else  {
            res.send({status: 'Some Error Has Occured'})
        }
    })
})

router.use('/updateSubAdmin', (req, res, next) => {
    let db = getDb();
    const { username, password, phonenumber, email, originalusername } = req.headers;
    db.collection('subAdmins').updateOne({ username: originalusername }, {
        $set: {
            username: username,
            password: password,
            phonenumber: phonenumber,
            email: email
        }
    }).then((response) => {
        if (response) {
            res.send({status: 'Update the record'})
        } else {
            res.send({status: 'Some Error Has Occured'})
        }
    })
})

router.use('/loginSubAdmin', (req, res, next) => {
    let db = getDb();
    const { username, password } = req.headers;
    db.collection('subAdmins').find({ username: username, password: password }).toArray().then((response) => {
        if (response.length > 0) {
            res.cookie('sub', response[0]._id, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 
            })
            res.send({
            message: 'done', user: response[0]
            })
        }
        
    })
})


router.use('/userSubAdmin', (req, res, next) => {
    let db = getDb();
    const cookie = req.cookies['sub'];
    if (!cookie) {
        res.send({ status: 'not logged in' });
    } else {
        const claimObjectId = new ObjectId(cookie);
        db.collection('subAdmins').find({ _id: claimObjectId }).toArray().then((response) => {
            if (response.length > 0){
                res.send({user: response[0], status: 'loggedIn'})
            } else {
                res.send({ status: 'not in database' });
            }
        })
    }
})

exports.subAdmin = router
