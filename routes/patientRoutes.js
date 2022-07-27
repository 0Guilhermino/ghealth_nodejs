const router = require('express').Router()

const Patient = require('../models/Patient')

router.post('/', async (req, res) => {

    const {name, healthInsuranceCardId, address, createdAt} = req.body
  
    if(!name) {
      res.status(422).json({ error: 'O nome é obrigatório'})
    }
  
    const patient = {
      name, 
      healthInsuranceCardId, 
      address, 
      createdAt
    }
    
    try {
  
      await Patient.create(patient)
  
      res.status(201).json({ message: 'Paciente inserido no sistema com sucesso!' })
      
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })

  module.exports = router