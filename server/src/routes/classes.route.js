const express = require('express')
const router = express.Router()
const conexionMysql = require('../database')
const classModel = require('../models/class')
const verifyToken = require('../Auth/verifyToken')



router.get('/classes', verifyToken, (req, res)=>{

    conexionMysql.query(classModel.getClasses, (err, rows, fields) => {
        if (err) res.status(500).send(err)
        else {
            res.status(200).send(rows);
        }
    })    
})

router.post('/classes/add', verifyToken, (req, res)=>{
    
    let data = {
        name: req.body.className,
    }

    conexionMysql.query(classModel.saveClass, [data], (err, rows, fields) => {
        if (err) res.status(500).send(err)
        else {
            res.json({
                "class_added": true
            });
        }
    })    
})

router.delete('/classes/delete', verifyToken, (req, res)=>{
    conexionMysql.query(classModel.deleteClass, req.body.className, (err, rows, fields) => {
        if (err) res.status(500).send(err)
        else {
            res.json({
                "class_deleted": true
            });
        }
    })  
})




module.exports = router;
