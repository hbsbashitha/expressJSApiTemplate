import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { adminSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'admin';

export const getAdmins = async (req, res) => {
  try {
    const data = await prisma.admin.findMany({
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

export const getAdminByID = async (req, res) => {
  try {
    const data = await prisma.admin.findMany({
      where: {
        adminId: parseInt(req.params.id, 10),
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

export const createAdmin = async (req, res) => {
  const { error } = adminSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.admin.create({
        data: {
          ...reqData,
        },
      });
      res.status(200)
        .send(data);
    } catch (e) {
      res.status(500)
        .send(error.message);
      log.error(NAME_SPACE, e.message);
    }
  } else {
    res.status(500)
      .send(error.details[0].message);
    log.error(NAME_SPACE, error.details[0].message);
  }
};

export const updateAdmin = async (req, res) => {
  const { error } = adminSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.admin.update({
        where: { adminId: parseInt(req.params.id, 10) },
        data: {
          ...reqData,
        },
      });
      res.status(200)
        .send(data);
    } catch (e) {
      res.status(500)
        .send(error.message);
      log.error(NAME_SPACE, e.message);
    }
  } else {
    res.status(500)
      .send(error.details[0].message);
    log.error(NAME_SPACE, error.details[0].message);
  }
};

export const removeAdmin = async (req, res) => {
  try {
    const data = await prisma.admin.update({
      where: {
        adminId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove admin Successfully');
    res.status(200)
      .send([data, 'Remove admin Successfully  ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
