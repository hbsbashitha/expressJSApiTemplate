import express from 'express';
import {
  createSite, getSiteByID, getSites, removeSite, updateSite,
} from '../controllers/siteController';

const siteRouter = express.Router({ mergeParams: true });

siteRouter.route('/')
  .get(getSites);

siteRouter.route('/:id')
  .get(getSiteByID);

siteRouter.route('/')
  .post(createSite);

siteRouter.route('/:id')
  .put(updateSite);

siteRouter.route('/:id')
  .delete(removeSite);

export default siteRouter;
