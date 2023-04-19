import express from 'express';
import {
  createTask, getTaskByID, getTasks, removeTask, updateTask,
} from '../controllers/taskController';

const taskRouter = express.Router({ mergeParams: true });

taskRouter.route('/')
  .get(getTasks);

taskRouter.route('/:id')
  .get(getTaskByID);

taskRouter.route('/')
  .post(createTask);

taskRouter.route('/:id')
  .put(updateTask);

taskRouter.route('/:id')
  .delete(removeTask);

export default taskRouter;
