const express = require('express');
const router = express.Router();
const { register } = require('../controllers/user.controller');
router.get('/ping', (req, res) => {
  res.send('pong');
});

router.post('/register', register);


module.exports = router;
