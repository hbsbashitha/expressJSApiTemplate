import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { taskSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'task';

export const getTasks = async (req, res) => {
  try {
    const data = await prisma.task.findMany({
      where: {
        securityStatus: 'active',
      },
    });
    res.status(200)
      .json(data);
  } catch (error) {
    res.status(500)
      .send(error);
    log.error(NAME_SPACE, error.message);
  }
};

export const getTaskByID = async (req, res) => {
  try {
    const data = await prisma.task.findMany({
      where: {
        taskId: parseInt(req.params.id, 10),
        securityStatus: 'active',
      },
    });
    res.status(200)
      .send(data);
  } catch (error) {
    res.status(500)
      .send(error);
    log.error(NAME_SPACE, error.message);
  }
};

export const createTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.task.create({
        data: {
          ...reqData,
        },
      });
      res.status(200)
        .send(data);
    } catch (e) {
      res.status(500)
        .send(error.message);
      log.error(NAME_SPACE, error.message);
    }
  } else {
    res.status(500)
      .send(error.details[0].message);
    log.error(NAME_SPACE, error.details[0].message);
  }
};

export const updateTask = async (req, res) => {
  const { error } = taskSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.task.update({
        where: { taskId: parseInt(req.params.id, 10) },
        data: {
          ...reqData,
        },
      });
      res.status(200)
        .send(data);
    } catch (e) {
      res.status(500)
        .send(e.message);
      log.error(NAME_SPACE, e.message);
    }
  } else {
    res.status(500)
      .send(error.details[0].message);
    log.error(NAME_SPACE, error.details[0].message);
  }
};

export const removeTask = async (req, res) => {
  try {
    const data = await prisma.task.update({
      where: {
        taskId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove task Successfully');
    res.status(200)
      .send([data, 'Remove task Successfully   ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
