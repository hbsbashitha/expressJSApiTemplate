import bcrypt from "bcrypt"

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export default hashPassword;
