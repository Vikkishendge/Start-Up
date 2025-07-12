const { User } = require('../models');

exports.createUser = async (req, res,next) => {
  try {
   
    const{name,email,password,role}=req.body;
   // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    next(err);
  }
};

