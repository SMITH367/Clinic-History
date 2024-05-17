
const jwt = require('jsonwebtoken')

// Veryfing the token for auth
const verifyToken = (req, res, next) => {
    
    const header = req.headers['authorization']
    if (header != undefined) {
        const token = header
        req.auth = token

        jwt.verify(req.auth, 'secretKey', async (err, data) => {
            if (err) {
                res.send(err);
            } else {
                next();      
            }
        })
        
    } else {
        res.sendStatus(403)
    }
}

module.exports = verifyToken