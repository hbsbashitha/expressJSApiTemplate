import express from 'express';
import {
  createStaffMember, getStaffMemberByID, getStaffMembers, removeStaffMember, updateStaffMember,
} from '../controllers/staffMemberController';

const staffMemberRouter = express.Router({ mergeParams: true });

staffMemberRouter.route('/')
  .get(getStaffMembers);

staffMemberRouter.route('/:id')
  .get(getStaffMemberByID);

staffMemberRouter.route('/')
  .post(createStaffMember);

staffMemberRouter.route('/:id')
  .put(updateStaffMember);

staffMemberRouter.route('/:id')
  .delete(removeStaffMember);

export default staffMemberRouter;
