// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   const token = req.header('x-auth-token');

//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };


// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   // Skip token validation for preflight OPTIONS requests
//   if (req.method === 'OPTIONS') {
//     return next();
//   }

//   // Get token from the header
//   const token = req.header('x-auth-token');

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user; // Attach user info to the request object
//     next(); // Proceed to the next middleware/route
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const token = req.header('Authorization')?.split(' ')[1] || 
                req.cookies.token || 
                req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is invalid or expired' });
  }
};
