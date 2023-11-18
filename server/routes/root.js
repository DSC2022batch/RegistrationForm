// adding all the routes here

const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '..', 'views','form.html'));
});

router.get('/auth', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', 'views', 'authentication.html'));
})

module.exports = router;
