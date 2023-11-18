// creating a Table to store registration details

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new Schema({
    fullName: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      registrationNumber: {
        type: String,
        required: true,
        unique: true // Assuming each registration has a unique number
      },
      collegeEmail: {
        type: String,
        required: true,
        match: /^[\w-]+@vitbhopal\.ac\.in$/
        , // Example regex for college email validation
        unique: true // Assuming each registration uses a unique college email
      },
      year: {
        type: String,
        required: true
      },
      transactionId: {
        type: String,
        required: true,
        unique: true // Assuming each transaction ID is unique
      },
    //   paymentScreenshot: {
    //     type: String // This field stores the path or URL to the uploaded screenshot
    //     // You might want to use a storage service like AWS S3 or similar for handling file uploads
    //   }
    });


module.exports = mongoose.model('Registrations', registrationSchema);