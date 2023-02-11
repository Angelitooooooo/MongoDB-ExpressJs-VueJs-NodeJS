const mongoose = require('mongoose')
// mongoose.connect(process.env.DATABASE_URL,)
const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true,
    },
    password : String,
})
const User = mongoose.model('User' , userSchema)
module.exports = User