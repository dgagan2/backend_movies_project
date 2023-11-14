const { default: mongoose } = require('mongoose')

const {MONGO_URL}=process.env

function connectToDatabase(){
    mongoose.connect(MONGO_URL)
    .then(()=>console.log(`MongoDB Connected`))
    .catch(error =>console.log("Database ERROR:", error))
}

module.exports=connectToDatabase