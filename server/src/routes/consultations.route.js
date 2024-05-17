const express = require('express')
const router = express.Router()
const conexionMysql = require('../database')
const consultationModel = require('../models/consultation')
const verifyToken = require('../Auth/verifyToken')


router.get('/consultations', verifyToken, (req, res)=>{
  
    let patient = req.body.patient;

    conexionMysql.query(consultationModel.getConsultationsByPatient, patient, (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            res.status(200).send(rows);
        }
    })

})

router.get('/consultation/:id', verifyToken, (req, res)=>{
  
    let id_consultation = req.params.id

    conexionMysql.query(consultationModel.getConsultationByPatient, id_consultation, (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
        if(rows.length >0)
            res.status(200).send(rows);
        else res.status(404).json({error:"Consultation not found"})
        }
    })

})


router.post('/consultation', verifyToken, (req, res)=>{
  
    let data = {
        patient:req.body.patient,
        description:req.body.description,
        date_consultation: new Date()
    }

    conexionMysql.query(consultationModel.saveConsultation, [data], (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            res.json({
                "consultation_added": true
            });
        }
    })

})


router.put('/consultation', verifyToken, (req, res)=>{
  
    const id_consultation = req.body.id_consultation
    const newDescription = req.body.newDescription

    conexionMysql.query(consultationModel.updateConsultation, [newDescription,id_consultation], (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            if(rows.changedRows >0)
                res.json({"consultation_modified": true});
            else res.status(400).json({error:"id_consultation is not exist"})
        }
    })

})



module.exports = router;
