const jsonwebtoken = require("jsonwebtoken")
const jwtConfig = {
    expiresIn: '60m'
}
function signToken (payload) {
    return jsonwebtoken.sign(payload, process.env.SECRET_KEY, jwtConfig)
}

module.exports=signToken