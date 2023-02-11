const jwt = require('jsonwebtoken');
const User = require('../models/users.js')


function authenticateToken(req , res , next ){
    let token =     req.headers.token
    if(token == null){
        if(err) return  res.status(401).json({
            title : 'Unathorized'
        })
    }

    jwt.verify(token,process.env.SECRET_KEY, ( err , decoded ) =>{
        if(err) return  res.status(403).json({
            title : 'Unathorized'
        })

        User.findOne( { _id : decoded.userId} , ( err ,user) => {
            if(err) return console.log(err)
                req.user = {
                    email : user.email,
                    name : user.name
                }
               next();
            //  res.status(200).json({
            //     title : 'user grabbed',
            //     User : {
            //         email : user.email,
            //         name : user.name
            //     }
            // })

        })
    })

}
module.exports = authenticateToken