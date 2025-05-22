import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'No token provided'});
  }

  try {
    const privateKey = '123456';
    const decodedToken = await jwt.verify(token, privateKey);
    if (!decodedToken) {
      return res.status(401).json({message: 'Authorisation failed...'});
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log('Error in token verification', error);
  }
};

export default verifyToken;
