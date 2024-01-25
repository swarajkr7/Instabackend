const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb+srv://swaraj853:iwdbwbp@cluster0.aetzdx0.mongodb.net/instagram?retryWrites=true&w=majority")

module.exports={
    connection
}