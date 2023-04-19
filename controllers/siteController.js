import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { siteSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'site';

export const getSites = async (req, res) => {
  try {
    const data = await prisma.site.findMany({
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

export const getSiteByID = async (req, res) => {
  try {
    const data = await prisma.site.findMany({
      where: {
        siteId: parseInt(req.params.id, 10),
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

export const createSite = async (req, res) => {
  const { error } = siteSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.site.create({
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

export const updateSite = async (req, res) => {
  const { error } = siteSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.site.update({
        where: { siteId: parseInt(req.params.id, 10) },
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

export const removeSite = async (req, res) => {
  try {
    const data = await prisma.site.update({
      where: {
        siteId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove Site Successfully');
    res.status(200)
      .send([data, 'Remove Site Successfully   ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
