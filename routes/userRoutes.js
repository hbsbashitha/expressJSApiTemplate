import express from 'express';
import {
  createUser, getUserByID, getUsers, loginUser, removeUser, updateUser,
} from '../controllers/userController';
import { upload } from '../utils';

const userRouter = express.Router({ mergeParams: true });

userRouter.route('/')
  .get(getUsers);

userRouter.route('/:id')
  .get(getUserByID);

userRouter.route('/',upload.single('file'))
  .post(createUser);

userRouter.route('/:id')
  .put(updateUser);

userRouter.route('/:id')
  .delete(removeUser);

userRouter.route('/login')
  .post(loginUser)

export default userRouter;
