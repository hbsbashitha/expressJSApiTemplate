import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { businessSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'business';

export const getBusiness = async (req, res) => {
  try {
    const data = await prisma.business.findMany({
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

export const getBusinessByID = async (req, res) => {
  try {
    const data = await prisma.business.findMany({
      where: {
        businessId: parseInt(req.params.id, 10),
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

export const createBusiness = async (req, res) => {
  const { error } = businessSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.business.create({
        data: {
          ...reqData,
        },
      });
      res.status(200)
        .send(data);
    } catch (e) {
      res.status(500)
        .send(e.message);
      log.error(NAME_SPACE, error.message);
    }
  } else {
    res.status(500)
      .send(error.details[0].message);
    log.error(NAME_SPACE, error.details[0].message);
  }
};

export const updateBusiness = async (req, res) => {
  const { error } = businessSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.business.update({
        where: { businessId: parseInt(req.params.id, 10) },
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

export const removeBusiness = async (req, res) => {
  try {
    const data = await prisma.business.update({
      where: {
        businessId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove business Successfully');
    res.status(200)
      .send([data, 'Remove business Successfully  ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
