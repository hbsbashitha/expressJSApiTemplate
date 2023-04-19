import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import adminRouter from './adminRoutes';
import businessRouter from './businessRoutes';
import clientRouter from './clientRoutes';
import jobRouter from './jobRoutes';
import managerRouter from './managerRoutes';
import siteRouter from './siteRoutes';
import staffMemberRouter from './staffMemberRoutes';
import taskRouter from './taskRoutes';
import userRouter from './userRoutes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/admins', adminRouter);
app.use('/business', businessRouter);
app.use('/clients', clientRouter);
app.use('/jobs', jobRouter);
app.use('/managers', managerRouter);
app.use('/sites', siteRouter);
app.use('/staffmembers', staffMemberRouter);
app.use('/tasks', taskRouter);

export default app;
