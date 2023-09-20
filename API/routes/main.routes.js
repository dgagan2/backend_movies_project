const { protect, checkRoles } = require("../middleware/auth.handler")
const accountRoute = require("./account.routes")
const movieRoute = require("./movie.routes")
const roleRoute = require("./role.routes")
const stateRoute = require("./state.routes")
const userRoute = require("./user.routes")

const routerApi= (app)=>{
    app.get('/', (req, res)=>{res.send('Oura Movies')})
    app.use('/user', userRoute)
    app.use('/account', accountRoute)
    app.use('/state', protect(), checkRoles('admin'), stateRoute)
    app.use('/role', protect(), checkRoles('admin'), roleRoute)
    app.use('/movies', movieRoute)
    // app.use('/comments')
    app.use('*', (req, res)=>{res.status(404).send("Not Found")})
    
}

module.exports=routerApi