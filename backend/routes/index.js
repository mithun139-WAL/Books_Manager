/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
const express = require('express');

const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});
router.get('/uploads/:name', (req, res) => {
  const filePath = path.join(__dirname, '../', `/uploads/${req.params.name}`);
  console.log(filePath);
  res.sendFile(filePath);
});
module.exports = router;
