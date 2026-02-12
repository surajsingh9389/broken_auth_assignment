const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  
  const header = req.headers.authorization;

  if (!header) {
      return res.status(401).json({ error: 'No token provided' });
    }
  
  // Split "Bearer <token>" by space and take the second part at index 1, Actual JWT token
  const token = header.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET || "default-secret-key";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
    // Missing next() request gets stuck, protected route never reached, browser waits forever.
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
