import validator from 'express-validator';
const {body, validationResult} = validator;
import { USER_TYPES } from '../models/User.js';

const validateUser = [
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('type').notEmpty().isString().custom(value => {
    if(value !== USER_TYPES.CONSUMER && value !== USER_TYPES.SUPPORT) {
      throw new Error('Wrong user type');
    }

    return true;
  }),
  (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  }
];

export default validateUser;
