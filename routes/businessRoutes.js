import express from 'express';
import {
  createBusiness, getBusiness, getBusinessByID, removeBusiness, updateBusiness,
} from '../controllers/businessController';

const businessRouter = express.Router({ mergeParams: true });

businessRouter.route('/')
  .get(getBusiness);

businessRouter.route('/:id')
  .get(getBusinessByID);

businessRouter.route('/')
  .post(createBusiness);

businessRouter.route('/:id')
  .put(updateBusiness);

businessRouter.route('/:id')
  .delete(removeBusiness);

export default businessRouter;
