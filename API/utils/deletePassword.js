function deletePassword(user){
  
    return{
        id:user._id,
        email:user.email,
        role: user.role,
        state: user.state,
        fullName:{
            firstname: user.fullName.firstname,
            lastName: user.fullName.lastName
        },
        age: user.age,
        address:{
            city: user.address.city, 
            street: user.address.street, 
        },
        phoneNumber: user.phoneNumber
    }
    
}
function removePasswords(users){
    return users.map((u) => ({
        id: u._id,
        email: u.email,
        role: u.role,
        state: u.state,
        fullName: {
          firstname: u.fullName.firstname,
          lastName: u.fullName.lastName,
        },
        age: u.age,
        address: {
          city: u.address.city,
          street: u.address.street,
        },
        phoneNumber: u.phoneNumber,
      }))
}

module.exports={deletePassword,removePasswords}