const { default: mongoose } = require('mongoose')

function connectToDatabase(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log(`MongoDB Connected`))
    .catch(error =>console.log("Database ERROR:", error))
}

module.exports=connectToDatabase