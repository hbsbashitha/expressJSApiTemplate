import { PrismaClient } from '@prisma/client';
import { log } from '../utils';

const prisma = new PrismaClient();
const NAME_SPACE = 'Model';

export const get = async (req, res) => {
  const { model } = req.params;
  try {
    const data = await prisma[model].findMany({
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

export const getByID = async (req, res) => {
  const { model, id } = req.params;
  try {
    const data = await prisma[model].findUnique({
      where: {
        userId: parseInt(id, 10),
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

export const create = async (req, res) => {
  const { model } = req.params;
  if (true) {
    try {
      const reqData = req.body;
      const data = await prisma[model].create({
        data: {
          ...reqData,
        },
      });
      res.status(200)
        .send(data);
    } catch (error) {
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

export const update = async (req, res) => {
  const { model, id } = req.params;
  // const {
  //   error,
  //   value,
  // } = userSchema.validate(req.body);
  if (true) {
    try {
      const reqData = req.body;
      const data = await prisma[model].update({
        where: { userId: parseInt(id) },
        data: {
          ...reqData,
        },
      });
      res.status(200)
        .send(data);
    } catch (error) {
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

export const remove = async (req, res) => {
  const { model, id } = req.params;

  try {
    const data = await prisma[model].update({
      where: {
        userId: parseInt(id),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove User Successfully');
    res.status(200)
      .send('Remove User Successfully');
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
