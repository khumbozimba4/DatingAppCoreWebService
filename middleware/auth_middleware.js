const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.verifyToken =  (req, res, next)=> {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Missing token.' });
  }
   jwt.verify(token, secret, (err, decoded)=> {
    if (err) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    req.userId = decoded.userId;
    next();
  });
};
