const accountRoute = require("./account.routes")
const userRoute = require("./user.routes")

const routerApi= (app)=>{
    app.get('/', (req, res)=>{res.send('Oura Movies')})
    app.use('/user', userRoute)
    app.use('/account', accountRoute)
    // app.use('/movies')
    // app.use('/series')
    // app.use('/categories')
    // app.use('/comments')
    // app.use('/favorites')
    
}

module.exports=routerApi