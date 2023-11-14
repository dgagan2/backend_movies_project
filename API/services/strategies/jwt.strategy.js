const {Strategy, ExtractJwt} = require("passport-jwt")

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}
  
const jwtStrategy = new Strategy(options, async (payload, done) => {
        return done(null, payload)
    }
)
  
module.exports= jwtStrategy