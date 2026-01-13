const { Schema, model}= require("mongoose")
const argon2 = require("argon2")
const userSchema = new Schema({
    username:{
        type:String,
        required:[true, "Enter the username in the input"],
        unique: true,
    },
    passwd: {
        type:String,
        minLength: [6, "The password must be a minimum of 6 letters"],
        required:[true, "Enter the password in the input"]
    }
})

userSchema.pre("save",async function () {
    try{
        this.passwd = await argon2.hash(this.passwd)
    }catch(err){
        console.log(err);
    }
})

userSchema.statics.register = async(info) =>{
 if(info.passwd === info.conPass){
const newUser = new User({username:info.username,passwd:info.passwd})
await newUser.save();
return newUser._id
}
throw Error("Password doesn't match")
}

userSchema.statics.login = async(info)=>{
    const user = await User.findOne({username: info.username})
    if(user){
        if(argon2.verify(user.passwd, info.passwd)){
        return user._id
    }
    throw Error("Wrong Password")
    }
    throw Error("User not found")
    
}



const User = model("Users", userSchema)
module.exports = User

