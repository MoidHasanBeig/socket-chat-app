import express from 'express';
// controllers
import user from '../controllers/user.js';
import validateUser from '../validators/userValidator.js';

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .post('/', validateUser, user.onCreateUser)
  .get('/:id', user.onGetUserById)
  .delete('/:id', user.onDeleteUserById)

export default router;
