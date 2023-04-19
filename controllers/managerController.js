import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { managerSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'manager';

export const getManagers = async (req, res) => {
  try {
    const data = await prisma.manager.findMany({
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

export const getManagerByID = async (req, res) => {
  try {
    const data = await prisma.manager.findMany({
      where: {
        managerId: parseInt(req.params.id, 10),
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

export const createManager = async (req, res) => {
  const { error } = managerSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.manager.create({
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

export const updateManager = async (req, res) => {
  const { error } = managerSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.manager.update({
        where: { managerId: parseInt(req.params.id, 10) },
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

export const removeManager = async (req, res) => {
  try {
    const data = await prisma.manager.update({
      where: {
        managerId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove manager Successfully');
    res.status(200)
      .send([data, 'Remove manager Successfully   ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
