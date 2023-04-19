import express from 'express';
import {
  create, get, getByID, remove, update,
} from '../controllers/mainCrudController';

const mainRouter = express.Router();

mainRouter.route('/:model')
  .get(get);

mainRouter.route('/:model/:id')
  .get(getByID);

mainRouter.route('/:model')
  .post(create);

mainRouter.route('/:model/:id')
  .put(update);

mainRouter.route('/:model/:id')
  .delete(remove);

export default mainRouter;
