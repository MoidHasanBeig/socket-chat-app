import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET_KEY = 'mayihaveyourattentionplease';

export const decode = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId, function(error,user) {
      if(error) {
        res.status(400).json('Error:' + error);
      } else {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(400).json('No user found');
        }
      }
    });
    const payload = {
      userId: user._id,
      userType: user.type,
    };
    const authToken = jwt.sign(payload, SECRET_KEY);
    console.log('Auth', authToken);
    req.authToken = authToken;
    next();
  } catch (e) {
    return res.status(400).json({ success: false, message: error.error });
  }
}

export const encode = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const accessToken = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    req.userType = decoded.type;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
}
