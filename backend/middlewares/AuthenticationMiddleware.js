const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  console.log('Came in middleware');
  const token = req.header('token');
  if (!token) {
    res.status(401).json({status: 0, debug_msg: 'Token not found'});
  }
  try {
    const decodedToken = jwt.verify(token, 'secret_string');
    console.log(decodedToken);
    next();
  } catch (error) {
    res.status(401).json({status: 0, debug_msg: 'Token sent not Valid'});
  }
};
