const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router();
const cors = require('cors')
router.use(cors()) //Cross-Origin Resource Sharing (CORS
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/token')
//use router instead of app

const User = require('../models/users.js')
 
router.post('/signup', (req, res) => {
    const newUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, 10),
    })
    newUser.save( (err) =>{
        if(err){
            return res.status(400).json({
                title : 'error',
                message : 'Email already in use'
            })
        }
        return res.status(201).json({
            title : 'Sign up success',
        })

    })
})

router.post('/login',  (req, res) => {
    User.findOne({email : req.body.email}, (err, user ) =>{
        if(err) return res.status(500).json({
                title : 'error',
                message : 'Server Error',
            })
        if(!user) return res.status(404).json({
            title : 'error',
            message : 'No Email Found',
        })
        if(!bcrypt.compareSync(req.body.password , user.password)) return res.status(401).json({
            title : 'error',
            message : 'Incorret Credentials',
        })
        let token = jwt.sign( {userId : user._id} , process.env.SECRET_KEY , { expiresIn : '15s'})
        res.status(200).json({
            title : 'Success',
            token : token
        })
    })
})

router.get('/user', authenticateToken, async (req, res) => {
    console.log(req.user , " test")
//     let token =     req.headers.token

//     jwt.verify(token,process.env.SECRET_KEY, ( err , decoded ) =>{
//         if(err) return  res.status(401).json({
//             title : 'Unathorized'
//         })

//         User.findOne( { _id : decoded.userId} , ( err ,user) => {
//             if(err) return console.log(err)
//              res.status(200).json({
//                 title : 'user grabbed',
//                 User : {
//                     email : user.email,
//                     name : user.name
//                 }
//             })
//         })
//     })

})



router.get('/getUser', async (req, res) => {
    try{
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({ message : err.message})
    }
})


 
// ========================== your routes here ==============================//
 
 
// ========================== your routes here ==============================//
 
module.exports = router;