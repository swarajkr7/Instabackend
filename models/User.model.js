const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    email:String,
    fullname:String,
    username:String,
    password:String
})

const UserModel=mongoose.model("user", userSchema)

module.exports={
    UserModel
}