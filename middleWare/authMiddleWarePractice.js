const jwt = require('jsonwebtoken');

const authMiddleWare = async (req, res, next) => {
  try {
    const authHeader = req.header.authorization;
    if(!authHeader){
      return res.json({success: false, message: 'no token provided'});
    }

    const token = jwt.split(" ")[1]
    if(!token) {
      return res.json({success: false, message: 'invalid token format'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded;

    next
  } catch (error) {
    return res.json({
      success: false,
      message: 'unAuthorization' + error.message
    })
  }
}

module.exports = authMiddleWare