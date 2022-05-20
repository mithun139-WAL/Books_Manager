var express = require('express');
const jwt = require('jsonwebtoken');
const {body, validationResult} = require('express-validator');
const user = require('../models/user');
var router = express.Router();
const User = require('../models').User;

router.post('/login', async (req, res) => {
  let {email, password} = req.body;
  try {
    if (!(email && password)) {
      res.status(400).send('All input are required !!');
    }
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      return res.status(404).send({message: 'User not found!!'});
    }
    if (password !== user.password) {
      return res.status(401).send({message: 'Invalid Password!!'});
    } else {
      const payload = {
        user: {
          email: email,
        },
      };
      const token = jwt.sign(payload, 'secret_string', {expiresIn: 2000});

      res.status(200).json({token});
    }
  } catch {
    return res.status(500).send({msg: 'server problem'});
  }
});

module.exports = router;
