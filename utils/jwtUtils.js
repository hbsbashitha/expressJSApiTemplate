import jwt from 'jsonwebtoken'


export const tokenGenerator=(payload)=> {
  const  JWT_SECRET  = process.env.JWT_SECRET;
  console.log(JWT_SECRET)
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, JWT_SECRET, options);

}

export const verifyToken = (token, secretKey, callback) => {
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      callback(err);
    } else {
      callback(null, decoded);
    }
  });
};

