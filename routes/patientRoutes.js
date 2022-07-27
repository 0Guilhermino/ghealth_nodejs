const router = require('express').Router()

const Patient = require('../models/Patient')

//criação de dados
router.post('/', async (req, res) => {

    const {name, healthInsuranceCardId, address, createdAt} = req.body
  
    if(!name) {
      res.status(422).json({ error: 'O nome é obrigatório'})
      return
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

  // Leitura de Dados
  router.get('/', async (req, res) => {

    try {
      
      const patients = await Patient.find()

      res.status(200).json(patients)

    } catch (error) {
      res.status(500).json({error: error})
    }

  })

  router.get('/:id', async (req, res) => {
    
    const id = req.params.id

    try {
      
      const patient = await Patient.findOne({_id: id})

      if(!patient) {
        res.status(422).json({ message: 'Paciente não encontrado!' })
        return
      }

      res.status(200).json(patient)
    } catch (error) {
      res.status(500).json({error: error})
    }
  })

  // Update - atualização de dados (PATCH)
  router.patch('/:id', async (req, res) => {
    
    const id = req.params.id

    const {name, healthInsuranceCardId, address, createdAt} = req.body

    const patient = {
      name,
      healthInsuranceCardId,
      address,
      createdAt,
    }

    try {

      const updatedPatient = await Patient.updateOne({_id: id}, patient)

      if(updatedPatient.matchedCount === 0) {
        res.status(422).json({ message: 'Paciente não encontrado!' })
        return
      }

      res.status(200).json(patient)
      
    } catch (error) {
      res.status(500).json({error: error})
    }

})

// Deletar dados
router.delete('/:id', async (req, res) => {

  const id = req.params.id

  const patient = await Patient.findOne({_id: id})

      if(!patient) {
        res.status(422).json({ message: 'Paciente não encontrado!' })
        return
      }

      try {

        await Patient.deleteOne({_id: id})

        res.status(200).json({message: 'Paciente Removido com sucesso!'})

      } catch {
        res.status(500).json({error: error})
      }

})

  module.exports = router