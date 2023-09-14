const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required:[true, "El campo correo está vacío"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "El campo password  está vacío"],
    },
    state:{
        type: String,
        default: "active"
    },
    role:{
        type: String,
        default: "customer"
    },
    fullName:{
        firstname:{
            type:String,
            required: [true, "El campo nombre está vacío"]
        },
        lastName:{
            type:String,
            required: [true, "El campo apellido está vacío"]
        }
    },
    age:{
        type: Number,
        required: true
    },
    address:{
        city:{
            type: String
        },
        street:{
            type: String
        }
    },
    phoneNumber:{
        type: String
    }
},
    {timestamps:true}
)

module.exports=mongoose.model("User", userSchema)