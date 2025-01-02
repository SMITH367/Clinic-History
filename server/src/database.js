const mysql = require('mysql2')

const conexion = mysql.createConnection({
    host: "mysql-30cf7609-brayansmithpuente-1ae1.g.aivencloud.com",
    user: "avnadmin",
    port:23332,
    password:"AVNS_AYmjwSWcNAEhyVsdBoK",
    database:"defaultdb"
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