const express = require('express')
const router = express.Router()
const conexionMysql = require('../database')
const patientModel = require('../models/patient')
const verifyToken = require('../Auth/verifyToken')



router.get('/patients', verifyToken, (req, res)=>{

    conexionMysql.query(patientModel.getPatients, (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            res.status(200).send(rows);
        }
    })    
})

router.get('/patients/:id', verifyToken, (req, res)=>{

    conexionMysql.query(patientModel.getPatient, req.params.id, (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            if(rows.length > 0){
                res.status(200).send(rows[0]);
            }else {
                res.status(404).send({error:'Patient not found'});
            }
        }
    })    
})

router.get('/patients/search/:id', verifyToken, (req, res)=>{

    let paramsSearch= [`%${req.params.id}%`,`%${req.params.id}%`]
    conexionMysql.query(patientModel.searchPatient, paramsSearch, (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            res.status(200).send(rows);
        }
    })    
})

router.post('/patients', verifyToken, (req, res)=>{
  
    let data = {
        name: req.body.name,
        identification:req.body.identification,
        last_name:req.body.last_name,
        identificationType:req.body.identificationType,
        class_patient:req.body.class_patient,
        birthday:req.body.birthday,
        phone_number:req.body.phone_number,
    }

    conexionMysql.query(patientModel.savePatient, [data], (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            res.json({
                "patient_added": true
            });
        }
    })

})

router.put('/patients/:identification', verifyToken, (req, res)=>{
  
    let data = {
        name: req.body.name,
        last_name:req.body.last_name,
        identificationType:req.body.identificationType,
        class_patient:req.body.class_patient,
        birthday:req.body.birthday,
        phone_number:req.body.phone_number,
    }

    conexionMysql.query(patientModel.updatePatient, [data, req.params.identification], (err, rows, fields) => {
        if (err) res.status(500).json({error:err})
        else {
            if(rows.changedRows >0)
                res.json({"patient_modified": true});
            else res.status(400).json({error:"patient is not exist"})
        }
    })
})




module.exports = router;
