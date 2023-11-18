// making the api functions of registrations here

const fs = require('fs');
const path = require('path');

const Registrations = require('../models/Registrations');

const createNewRegistration = async (req,res)=>{
    if (!req?.body?.fullName || !req?.body?.phoneNumber || !req?.body?.registrationNumber || !req?.body?.collegeEmail || !req?.body?.year || !req?.body?.transactionId){
        return res.status(400).json({"message": "Some Details are missing."})
    }

    try {
        const { fullName, collegeEmail /* Other form fields */ } = req.body;
    
        // Validate the email format using a regex pattern
        const emailRegex = /^[\w-]+@vitbhopal\.ac\.in$/; // Regex pattern for vitbhopal.ac.in domain
    
        if (!emailRegex.test(collegeEmail)) {
          // If the email format doesn't match the expected pattern, send an error response
          return res.status(400).send('Invalid email format. Please use a valid vitbhopal.ac.in email.');
        }
    

      } catch (err) {
        res.status(500).send('Error registering. Please try again.');
        console.error('Error:', err);
      }

    try{
        const result = await Registrations.create({
            fullName : req.body.fullName,
            phoneNumber: req.body.phoneNumber,
            registrationNumber: req.body.registrationNumber,
            collegeEmail: req.body.collegeEmail,
            year: req.body.year,
            transactionId: req.body.transactionId,
        });

        res.status(201).json(result);

    } catch(err){
        console.log(err);
    }
};


const getAllRegistrations = async (req, res) =>{
    const registrations = await Registrations.find();
    if (!registrations) return res.status(204).json({"message": "No registrations found."});
    res.json(registrations);
};




const updateRegistration = async (req,res)=>{
    if (!req?.body?.id) return res.status(400).json({"message": "ID parameter is required."});

    const registration = await Registrations.findOne({_id: req.body.id}).exec();

    if (!registration) return res.status(204).json({"message": `No registrations matches ID ${req.body.id}`})

    if (req.body?.firstname ) registration.firstname = req.body.firstname;
    if (req.body?.lastname) registration.lastname = req.body.lastname;

    const result = await Registrations.save();

    res.json(result);
};


const deleteRegistration =async (req,res)=>{
    if (!req?.body?.id) return res.status(400).json({"message": "ID parameter is required."});

    const registration = await Registrations.findOne({_id: req.body.id}).exec();

    if (!registration) return res.status(204).json({"message": `No registrations matches ID ${req.body.id}`})

    const result = await Registrations.deleteOne({_id : req.body.id});

    res.json(result);
};


const getRegistration = async (req,res)=>{
    if (!req?.params?.id) return res.status(400).json({"message": "ID parameter is required."});

    const registration = await Registrations.findOne({_id: req.params.id}).exec();

    if (!registration) return res.status(204).json({"message": `No registrations matches ID ${req.body.id}`})  

    res.json(registration);
}

module.exports = {
    getAllRegistrations,
    createNewRegistration,
    updateRegistration,
    deleteRegistration,
    getRegistration
}