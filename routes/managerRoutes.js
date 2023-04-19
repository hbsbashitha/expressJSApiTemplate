import express from 'express';
import {
  createManager, getManagerByID, getManagers, removeManager, updateManager,
} from '../controllers/managerController';

const managerRouter = express.Router({ mergeParams: true });

managerRouter.route('/')
  .get(getManagers);

managerRouter.route('/:id')
  .get(getManagerByID);

managerRouter.route('/')
  .post(createManager);

managerRouter.route('/:id')
  .put(updateManager);

managerRouter.route('/:id')
  .delete(removeManager);

export default managerRouter;
