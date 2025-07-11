const { User } = require('../models');


console.log('controller');
exports.register = async (req, res) => {
  try {
    console.log('➡️ Register called with:', req.body);

    const { user_id,name, email, password, role } = req.body;
    const user = await User.create({ user_id,name, email, password, role });

    console.log('✅ User created:', user);
    res.status(201).json(user);
  } catch (error) {
    console.error('❌ Error in register:', error);
    res.status(500).json({ error: error.message });
  }
};
