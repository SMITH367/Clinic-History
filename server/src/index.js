const express = require('express')

const app = express()
app.set('port', 3000)
app.set('address','localhost')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json())

app.use(require('./routes/users.route'))
app.use(require('./routes/patients.route'))
app.use(require('./routes/classes.route'))
app.use(require('./routes/consultations.route'))
app.use(require('./routes/prescriptions.route'))


app.listen(app.get('port'),()=>{
    console.log('server in the port ',app.get('port'))
})

