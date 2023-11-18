// main server file for running the backend

// importing neccessary config data from the .env file
require('dotenv').config();

// importing neccessary packages required to run the backend
const express = require('express');
const connectDB = require('./config/connectDB');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

// connecting to MongoDB
connectDB();

// initializing PORT
const PORT = process.env.PORT || 3500; 

// ADDING NECCESSARY MIDDLEWARES
app.use(express.urlencoded({ extended: false}));            // built in middleware for handling form data
app.use(express.json());                                    // build in middleware for json
app.use(cors(corsOptions));                                 // Cross Origin Resource Sharing (Third Party Middleware)
app.use(express.static(path.join(__dirname, 'public')))     // middleware for css and images(static files)


// add api routes
app.use('/registrations', require('./routes/api/registration'))

// adding root routes
app.use('/', require('./routes/root'));


// this runs when we enter any other urls than the above
app.all('*',(req, res)=>{
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    } else if (req.accepts('json')){
        res.json({error : "404 not found"});
    } else{
        res.type('txt').send("404 not found");
    }
});


// listening to server
mongoose.connection.once("open",()=>{
    console.log("mongoDB connected ");
    app.listen(PORT, ()=> console.log('server running on PORT', PORT));
})
