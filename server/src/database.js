const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"",
    database:"HistoryClinic"
})
conexion.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("conected to the database")
    }
})
module.exports = conexion