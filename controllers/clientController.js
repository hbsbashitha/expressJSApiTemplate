import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { clientSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'client';

export const getClients = async (req, res) => {
  try {
    const data = await prisma.client.findMany({
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

export const getClientByID = async (req, res) => {
  try {
    const data = await prisma.client.findMany({
      where: {
        clientId: parseInt(req.params.id, 10),
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

export const createClient = async (req, res) => {
  const { error } = clientSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.client.create({
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

export const updateClient = async (req, res) => {
  const { error } = clientSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.client.update({
        where: { clientId: parseInt(req.params.id, 10) },
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

export const removeClient = async (req, res) => {
  try {
    const data = await prisma.client.update({
      where: {
        clientId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove client Successfully');
    res.status(200)
      .send([data, 'Remove client Successfully   ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
