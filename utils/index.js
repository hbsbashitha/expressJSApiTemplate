import log from './logger';
import hashPassword from './passwordHashingUtils';
import {tokenGenerator,verifyToken} from './jwtUtils';
import {upload} from './multerUtils';
import {saveToS3} from './s3Utils';

const test = () => {
  const count = 5;
  console.log('count: %d', count);
};

export { log, test,hashPassword,tokenGenerator,verifyToken,upload,saveToS3 };
