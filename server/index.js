require('dotenv').config()
const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})


const Users  = require('./routes/users.js')

app.use('/', Users)
 
app.listen(port,function(){
	console.log('listening to port ' + port);
})

