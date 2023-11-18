const express = require('express');
const router = express.Router();
const registrationController = require('../../controller/registratonController');

router.route('/')
    .post(registrationController.createNewRegistration)
    .get(registrationController.getAllRegistrations)
    .put(registrationController.updateRegistration)
    .delete(registrationController.deleteRegistration)

router.route('/:id')
    .get(registrationController.getRegistration)


module.exports = router;
