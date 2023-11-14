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
/*
Opción de esquema para eliminar ciertos datos al devolverlos
const userSchema = new Schema({
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

userSchema.set('toJSON', {
    transform:(document, returnedObject)=>{
        returnedObject.id=returnedObject._id
        delete returnedObject._id
        delete returnedObject._v

        delete returnedObject.password
    }
})

const User=model('User', userSchema)

module.exports=User*/