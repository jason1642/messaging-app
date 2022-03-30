import 'dotenv/config';
import jwt from 'jsonwebtoken';


// Utilization
// This is a middleware to be called before performing other 
// requests that require authorization. Returns an error/401
// if it cannot verify. If verified,  user_id, and username are
// sent to the next middleware via req.user

// Authenticate token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401);
  
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.status(403);
    req.user = user;

  });
  next();
}

export default verifyToken;