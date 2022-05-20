const express = require('express');
const {body, validationResult} = require('express-validator');
const router = express.Router();
const Category = require('../models').Categories;
const authentication = require('../middlewares/AuthenticationMiddleware');

router.get('/', authentication, async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
module.exports = router;
