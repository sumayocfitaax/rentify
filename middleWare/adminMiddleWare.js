// middleware/adminMiddleware.js

const adminMiddleware = (req, res, next) => {
  try {

    if (req.user.role !== "admin") {
      return res.json({
        success: false,
        message: "Access denied"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();

  } catch (error) {
    res.json({
      success: false,
      message: error.message
    });
  }
};

module.exports = adminMiddleware;