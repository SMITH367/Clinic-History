const express = require('express')
const router = express.Router()
const conexionMysql = require('../database')
const prescriptionsModel = require('../models/prescription')
const verifyToken = require('../Auth/verifyToken')


router.get('/prescriptions', verifyToken, (req, res) => {

    let patient = req.body.patient;

    conexionMysql.query(prescriptionsModel.getPrescriptions, patient, (err, rows, fields) => {
        if (err) res.status(500).json({
            error: err
        })
        else {
            res.status(200).send(rows);
        }
    })
})


router.post('/prescription', verifyToken, (req, res) => {

    let data = {
        patient: req.body.patient,
        prescription: req.body.prescription,
        date_prescription: new Date()
    }

    conexionMysql.query(prescriptionsModel.savePrescription, [data], (err, rows, fields) => {
        if (err) res.status(500).json({
            error: err
        })
        else {
            res.json({
                "prescription_added": true
            });
        }
    })

})


router.post('/prescription', verifyToken, (req, res) => {

    let data = {
        patient: req.body.patient,
        prescription: req.body.prescription,
        date_prescription: new Date()
    }

    conexionMysql.query(prescriptionsModel.savePrescription, [data], (err, rows, fields) => {
        if (err) res.status(500).json({
            error: err
        })
        else {
            res.json({
                "prescription_added": true
            });
        }
    })

})

router.delete('/prescription/:id', verifyToken, (req, res) => {

    const deletePrescription = () => {
        conexionMysql.query(prescriptionsModel.deletePrescription, id_prescription, (err, rows, fields) => {
            if (err) res.status(500).json({
                error: err
            })
            else {
                res.json({
                    "prescription_deleted": true
                });
            }
        })
    }

    const id_prescription = req.params.id

    conexionMysql.query(prescriptionsModel.getPrescriptionByID, id_prescription, (err, rows, fields) => {
        if (err) res.status(500).json({
            error: err
        })
        else {
            if (rows.length > 0)
                deletePrescription()
            else
                res.status(400).json({
                    error: "prescription is not exist"
                })
        }
    })

})



module.exports = router;