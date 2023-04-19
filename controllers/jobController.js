import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { jobSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'job';

export const getJobs = async (req, res) => {
  try {
    const data = await prisma.job.findMany({
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

export const getJobByID = async (req, res) => {
  try {
    const data = await prisma.job.findMany({
      where: {
        jobId: parseInt(req.params.id, 10),
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

export const createJob = async (req, res) => {
  const { error } = jobSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.job.create({
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

export const updateJob = async (req, res) => {
  const { error } = jobSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.job.update({
        where: { jobId: parseInt(req.params.id, 10) },
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

export const removeJob = async (req, res) => {
  try {
    const data = await prisma.job.update({
      where: {
        jobId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove Job Successfully');
    res.status(200)
      .send([data, 'Remove Job Successfully   ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
