import express from 'express';
import {
  createAdmin, getAdminByID, getAdmins, removeAdmin, updateAdmin,
} from '../controllers/adminController';

const adminRouter = express.Router({ mergeParams: true });

adminRouter.route('/')
  .get(getAdmins);

adminRouter.route('/:id')
  .get(getAdminByID);

adminRouter.route('/')
  .post(createAdmin);

adminRouter.route('/:id')
  .put(updateAdmin);

adminRouter.route('/:id')
  .delete(removeAdmin);

export default adminRouter;
