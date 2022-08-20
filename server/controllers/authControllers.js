require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");


const signToken = (id) =>{
   return  jwt.sign({id}, process.env.JWT_SECRET);
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return reject(err);
  
        resolve(user);
      });
  
    });
  };


const register = catchAsync (async (req,res) => {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    if(user){
        return res.status(400).send({ message: "Please try another email or password" });
    }

    user = await User.create(req.body);

    const token = signToken(user._id)

    res.status(201).json({
        status : 'success',
        token,
        data : user
    })
});


const login = catchAsync (async (req,res) => {
    const {email , password} = req.body;

    if(!email || !password) {
        return res.status(400).json({message: 'Please provide your email or password'})
    }
    let user = await User.findOne({ email: req.body.email }).select('+password');

    if(!user || !(await user.comaprepass(password ,user.password))){
        return res.status(401).send({ message: "Incorrect email or password" });
    }

    const token = signToken(user._id);

    res.status(201).json({
        status : 'success',
        token,
        data : user
    })
})

const isAuthenticate = catchAsync(async (req,res,next) => {
    
    if (!req.headers.authorization)
    return res.status(400).send({
      message: "Token is not authorized",
    });

    if (!req.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({
        message: "Token is not authorized",
        });

    const token = req.headers.authorization.split(" ")[1];
    
    
    let user;
    
    try {
        user = await verifyToken(token);
    } catch (err) {
        return res.status(400).send({
            message: "Token is not authorised",
        });
    }
    
    if(!user){
        return res.status(401).json({ message2 : "Token is not authorized"})
    }
    const { id } = user;

    var temp = await User.find({_id : id});
    

    if(temp[0].role !== 'admin'){
        return res.status(401).json({ message3 : " You are not authorized to modify/access this resource"})
    }
    req.user = temp[0];
    next();
});

const cartAuthenticate = catchAsync(async (req,res,next) => {
    
    if (!req.body.headers.authorization)
    return res.status(400).send({
      message12: "Token is not authorized",
    });

    if (!req.body.headers.authorization.startsWith("Bearer "))
        return res.status(400).send({
        message: "Token is not authorized",
        });

    const token = req.body.headers.authorization.split(" ")[1];
    
    
    let user;
    
    try {
        user = await verifyToken(token);
    } catch (err) {
        return res.status(400).send({
            message11: "Token is not authorised",
        });
    }
    
    if(!user){
        return res.status(401).json({ message2 : "Token is not authorized"})
    }
    const { id } = user;

    var temp = await User.find({_id : id});
    

    req.user = temp[0];
    next();
});

const cartAuthenticate2 = catchAsync(async (req,res,next) => {

   if (!req.headers.authorization)
   return res.status(400).send({
     message12: "Token is not authorized",
   });

   if (!req.headers.authorization.startsWith("Bearer "))
       return res.status(400).send({
       message: "Token is not authorized",
       });

   const token = req.headers.authorization.split(" ")[1];
   
   
   let user;
   
   try {
       user = await verifyToken(token);
   } catch (err) {
       return res.status(400).send({
           message11: "Token is not authorised",
       });
   }
   
   if(!user){
       return res.status(401).json({ message2 : "Token is not authorized"})
   }
   const { id } = user;

   var temp = await User.find({_id : id});
   

   req.user = temp[0];
   next();
});
module.exports = {register, login, isAuthenticate, cartAuthenticate, cartAuthenticate2};