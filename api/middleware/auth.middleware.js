import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'

  if (!token) {
    return res.status(401).json({message: 'Access token missing'});
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
