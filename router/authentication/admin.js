const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

router.use('/authLogin', (req, res, next) => {
    // if(req.headers.admin === 'Admin' && req.headers.password === 'mtb@123')
    const token = jwt.sign({ admin: req.headers.admin }, "AdminSecret");
    res.cookie('jwt', token, {httpOnly: true, maxAge: 24*60*60*1000});
    res.send('Intialized the auth process')

})

exports.auth = router