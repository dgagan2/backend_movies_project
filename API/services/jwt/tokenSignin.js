const jsonwebtoken = require("jsonwebtoken")
const jwtConfig = {
    expiresIn: '6h'
}

const {SECRET_KEY} = process.env

function signToken (payload) {
    return jsonwebtoken.sign(payload, SECRET_KEY, jwtConfig)
}

async function verifyToken (token) {
    return jsonwebtoken.verify(token, SECRET_KEY)
}



module.exports={signToken, verifyToken}