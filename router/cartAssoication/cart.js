const express = require('express');
const router = express.Router();
const getDb = require('../../database/database').getDb;
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')


router.use('/cartItemDelete', (req, res, next) => {
    let db = getDb()
    const { userid, productid } = req.headers;
    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
        let newCart = []
        for (let i = 0; i < response.cart.length; i++) {
            if (productid !== response.cart[i].product) {
                newCart.push(response.cart[i])
            }
        }
        db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
            $set: {
                cart: newCart
            }
        }).then((response) => {
            res.send({ cart: newCart })
        })
    })
})

router.use('/cartDisplay', (req, res, next) => {
    let db = getDb();
    const { userid } = req.headers;
    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
        res.send({ user: response })
    })
})

router.use('/cartItemDecrease', (req, res, next) => {
    let db = getDb()
    const { userid, productid } = req.body;
    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
        const newCart = response.cart.map((singleItem) => {

            if (productid !== singleItem.product._id) {
                return singleItem
            } else {
                const newObj = singleItem;
                newObj.quantity = newObj.quantity - 1;
                return newObj
            }
        })
        db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
            $set: {
                cart: newCart
            }
        }).then((response) => {
            res.send(newCart)
        })
    })
})

router.use('/cartItemIncrease', (req, res, next) => {
    let db = getDb()
    const { userid, productid } = req.body;
    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
        const newCart = response.cart.map((singleItem) => {

            if (productid !== singleItem.product._id) {
                return singleItem
            } else {
                const newObj = singleItem;
                newObj.quantity = newObj.quantity + 1;
                return newObj
            }
        })
        db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
            $set: {
                cart: newCart
            }
        }).then((response) => {
            res.send(newCart)
        })
    })
})

router.use('/cartAssociationTemp', (req, res, next)=>{
    let db = getDb()
    const {carts, userid} = req.body;
    // console.log("------------Cart Association Temp----------------");
    // console.log(carts)
    carts.map((singleItem)=>{
        db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
            let product;
            let flag = 0;
            if (response.cart) {
                for (let i = 0; i < response.cart.length; i++) {
                    if (flag > 0) {
                        break;
                    }
                    if (response.cart[i].product === singleItem.product._id) {

                        flag++
                        product = { product: response.cart[i].product, quantity: response.cart[i].quantity + singleItem.quantity }
                        const updateObj = { $set: {} };
                        updateObj.$set['cart.' + i] = product;
                        db.collection('users').updateOne({ _id: new ObjectId(userid) }, updateObj).then((response) => {
                            db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
                                res.send(response.cart)
                            })
                        })
                    }
                }
    
                if (flag === 0) {
                    db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
                        $push: {
                            cart: { product: singleItem.product._id, quantity: singleItem.quantity }
                        }
                    }).then((response) => {
                        db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
                            res.send(response.cart)
                        })
                    })
                }
    
            }
            else {
                db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
                    $push: {
                        cart: { product: singleItem.product._id, quantity: singleItem.quantity }
                    }
                }).then((response) => {
                    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
                        res.send(response.cart)
                    })
                })
            }
        })  
    })
})

router.use('/cartAssociation', (req, res, next) => {
    const { carts, userid, quantity } = req.body;

    let db = getDb()
    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
        let product;
        let flag = 0;
        if (response.cart) {
            for (let i = 0; i < response.cart.length; i++) {
                if (flag > 0) {
                    break;
                }
                if (response.cart[i].product === carts._id) {
                    flag++
                    product = { product: response.cart[i].product, quantity: response.cart[i].quantity + quantity }
                    const updateObj = { $set: {} };
                    updateObj.$set['cart.' + i] = product;
                    db.collection('users').updateOne({ _id: new ObjectId(userid) }, updateObj).then((response) => {
                        db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
                            res.send(response.cart)
                        })
                    })
                }
            }

            if (flag === 0) {
                db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
                    $push: {
                        cart: { product: carts._id, quantity: quantity }
                    }
                }).then((response) => {
                    db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
                        res.send(response.cart)
                    })
                })
            }

        }
        else {
            db.collection('users').updateOne({ _id: new ObjectId(userid) }, {
                $push: {
                    cart: { product: carts._id, quantity: quantity }
                }
            }).then((response) => {
                db.collection('users').findOne({ _id: new ObjectId(userid) }).then((response) => {
                    res.send(response.cart)
                })
            })
        }
    })
})
// router.use('/cartDelete', (req, res, next) => {
//     db.collection('users')
// })
exports.cart = router




// const add = (a, b) => {
//     return a + b
// }

// const coo = (add) => {
//     console.log('adasd');
//     add();
// }