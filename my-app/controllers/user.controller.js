const {User} = require('../models');

exports.register = async(req,res)=>{

    try{

        console.log('controller')
     const {name,email,password,role} = req.body;

     const user=await User.create({name,email,password,role});

     console.log(req.body);

     res.status(201).json(user);
    }catch(error)
    {
        res.status(401).json({error: error.message})
    }
}