import { PrismaClient } from '@prisma/client';
import { log } from '../utils';
import { staffmemberSchema } from '../model';

const prisma = new PrismaClient();
const NAME_SPACE = 'StaffMember';

export const getStaffMembers = async (req, res) => {
  try {
    const data = await prisma.staffmember.findMany({
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

export const getStaffMemberByID = async (req, res) => {
  try {
    const data = await prisma.staffmember.findMany({
      where: {
        staffId: parseInt(req.params.id, 10),
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

export const createStaffMember = async (req, res) => {
  const { error } = staffmemberSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.staffmember.create({
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

export const updateStaffMember = async (req, res) => {
  const { error } = staffmemberSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.staffmember.update({
        where: { staffId: parseInt(req.params.id, 10) },
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

export const removeStaffMember = async (req, res) => {
  try {
    const data = await prisma.staffmember.update({
      where: {
        staffId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove StaffMember Successfully');
    res.status(200)
      .send([data, 'Remove StaffMember Successfully   ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};
