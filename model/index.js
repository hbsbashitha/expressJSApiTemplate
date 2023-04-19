import Joi from 'joi';

const adminSchema = Joi.object({
  adminId: Joi.number(),
  securityStatus: Joi.string(),
});

const businessSchema = Joi.object({
  businessId: Joi.number(),
  name: Joi.string(),
  abn: Joi.string(),
  securityStatus: Joi.string(),
});

const clientSchema = Joi.object({
  clientId: Joi.number(),
  contactNo: Joi.string(),
  name: Joi.string(),
  email: Joi.string(),
  contactPerson: Joi.string(),
  securityStatus: Joi.string(),
  abn: Joi.string(),
});

const jobSchema = Joi.object({
  jobId: Joi.number(),
  frequency: Joi.string(),
  endTime: Joi.string(),
  startTime: Joi.string(),
  beforePhotos: Joi.string(),
  reportStatus: Joi.string(),
  securityStatus: Joi.string(),
  jobStatus: Joi.string(),
  afterPhotos: Joi.string(),
  timeRange: Joi.string(),
  abn: Joi.string(),
  managerId: Joi.number(),
  clientId: Joi.number(),
});

const jobtasksSchema = Joi.object({
  jobId: Joi.number().required(),
  taskId: Joi.number().required(),
});

const managerSchema = Joi.object({
  managerId: Joi.number(),
  businessId: Joi.number(),
  securityStatus: Joi.string(),
});

const siteSchema = Joi.object({
  siteId: Joi.number(),
  siteName: Joi.string(),
  siteAddress: Joi.string(),
  securityStatus: Joi.string(),
  clientId: Joi.number(),
});

const staffmembersjobSchema = Joi.object({
  jobId: Joi.number(),
  staffId: Joi.number(),
});

const staffmemberSchema = Joi.object({
  staffId: Joi.number(),
  email: Joi.string(),
  phone: Joi.string(),
  dob: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  address: Joi.string(),
  securityStatus: Joi.string(),
  businessId: Joi.number(),
});

const taskSchema = Joi.object({
  taskId: Joi.number(),
  task: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  securityStatus: Joi.string(),
  jobId: Joi.number(),
});

const userSchema = Joi.object({
  userId: Joi.number(),
  username: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  image: Joi.string(),
  type: Joi.string(),
  createdTime: Joi.string(),
  securityStatus: Joi.string(),
});

export {
  adminSchema,
  businessSchema,
  clientSchema,
  jobSchema,
  jobtasksSchema,
  managerSchema,
  siteSchema,
  staffmembersjobSchema,
  taskSchema,
  userSchema,
  staffmemberSchema,
};
