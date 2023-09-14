const mongoose = require("mongoose")

const auditSchema = mongoose.Schema({
    idUser:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    event:{
        type: String,
        default: "login"
    },
    idEvent:{
        type: String,
        require: false
    }
}, 
    {timestamps:true}
)

module.exports=mongoose.model("Audit", auditSchema)