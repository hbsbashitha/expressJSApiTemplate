import express from 'express';
import {
  createJob, getJobByID, getJobs, removeJob, updateJob,
} from '../controllers/jobController';

const jobRouter = express.Router({ mergeParams: true });

jobRouter.route('/')
  .get(getJobs);

jobRouter.route('/:id')
  .get(getJobByID);

jobRouter.route('/')
  .post(createJob);

jobRouter.route('/:id')
  .put(updateJob);

jobRouter.route('/:id')
  .delete(removeJob);

export default jobRouter;
