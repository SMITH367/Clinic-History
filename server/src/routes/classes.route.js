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

router.put('/classes/update', verifyToken, (req, res)=>{
    let data = {
        name:req.body.className,
        class_id:req.body.class_id
    }
    conexionMysql.query(classModel.updateClass, [{name:data.name}, data.class_id], (err, rows, fields) => {
        if (err) res.status(500).send(err)
        
        else {
            res.json({
                "class_updated": true
            });
        }
    })  
})




module.exports = router;
