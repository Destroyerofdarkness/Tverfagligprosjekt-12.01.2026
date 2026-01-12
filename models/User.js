const { Schema, model}= require("mongoose")
const argon2 = require("argon2")
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique: true,
    },
    passwd: {
        type:String,
        minLength: 6,
        required:true
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
const newUser = new User({username:info.username,passwd:info.passwd})
await newUser.save();
return newUser._id
}



const User = model("Users", userSchema)
module.exports = User

