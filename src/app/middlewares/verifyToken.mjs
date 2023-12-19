import jwt from 'jsonwebtoken';
import config from '../../config/index.mjs';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({message: "unAuthorized Access"});
  }
  const token = authHeader.split(" ")[1];

  
  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) {
      console.log("first")
      // Token verification failed
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send({ message: 'Token expired' });
      } else {
        console.log("first")
        return res.status(403).send({ message: 'Forbidden access' });
      }
    }
    // Token is valid
    req.decoded = decoded; // Store decoded token information in the request object
    next();
  });
};

export default verifyToken;
