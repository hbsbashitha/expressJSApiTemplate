import express from 'express';
import {
  createClient, getClientByID, getClients, removeClient, updateClient,
} from '../controllers/clientController';

const clientRouter = express.Router({ mergeParams: true });

clientRouter.route('/')
  .get(getClients);

clientRouter.route('/:id')
  .get(getClientByID);

clientRouter.route('/')
  .post(createClient);

clientRouter.route('/:id')
  .put(updateClient);

clientRouter.route('/:id')
  .delete(removeClient);

export default clientRouter;
