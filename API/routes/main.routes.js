const routerAPI=(app)=>{
    app.use('/', (req, res)=>{res.send('Oura Movies')})
}

module.exports=routerAPI