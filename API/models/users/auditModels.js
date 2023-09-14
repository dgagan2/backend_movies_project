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
        default: "Login"
    }
}, 
    {timestamps:true}
)

module.exports=mongoose.model("AuditUser", auditSchema)