const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Check if the Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Split the header to get the token
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data to the request object
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};
