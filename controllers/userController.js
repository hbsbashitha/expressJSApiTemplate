import { PrismaClient } from '@prisma/client';
import { log,hashPassword,tokenGenerator } from '../utils';
import { userSchema } from '../model';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const NAME_SPACE = 'user';

export const getUsers = async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        securityStatus: 'active',
      },
    });

    if(data.length===0){
      return res.status(404).json({ message: 'User not found' });

    }
    res.status(200)
      .json(data);
  } catch (error) {
    res.status(500)
      .send(error);
    log.error(NAME_SPACE, error.message);
  }
};

export const getUserByID = async (req, res) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        userId: parseInt(req.params.id, 10),
        securityStatus: 'active',
      },
    });
    if(data.length===0){
      return res.status(404).json({ message: 'User not found' });

    }
    res.status(200)
      .send(data);
  } catch (error) {
    res.status(500)
      .send(error);
    log.error(NAME_SPACE, error.message);
  }
};

export const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (!error) {
    try {
      //that part use for hashing the password coming from request body
      if(req.body.password){
        await hashPassword(req.body.password).then(hash => {
          req.body.password=hash
        })
      }
      const reqData = req.body;
      const data = await prisma.user.create({
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

export const updateUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (!error) {
    try {
      const reqData = req.body;
      const data = await prisma.user.update({
        where: { userId: parseInt(req.params.id, 10) },
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

export const removeUser = async (req, res) => {
  try {
    const data = await prisma.user.update({
      where: {
        userId: parseInt(req.params.id, 10),
      },
      data: {
        securityStatus: 'inactive',
      },
    });
    log.info(NAME_SPACE, 'Remove User Successfully');
    res.status(200)
      .send([data, 'Remove User Successfully   ']);
  } catch (error) {
    log.error(NAME_SPACE, error.message);
    res.status(500)
      .send(error);
  }
};

export const loginUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (!error) {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await prisma.user.findMany({
        where: {
          email: email,
        },
      });



      if (user.length===0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordCorrect = await bcrypt.compare(password, user[0].password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token =tokenGenerator({email:email})



      res.status(200).json({ user: user, token });
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
