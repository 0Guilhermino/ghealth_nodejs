const mongoose = require('mongoose')

const Patient = mongoose.model('Patient', {
    
    name: String,
    healthInsuranceCardId: String,
    address: String,
    createdAt: String,
})

module.exports = Patient