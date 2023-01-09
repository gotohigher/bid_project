const jwt = require("jwt-simple")

const generateToken = (user) => {
    const timeStamp = new Date().getTime();
    const payload = {
      sub: user.email,
      iat: timeStamp
    }
    return jwt.encode(payload.sub, 'unsafe_jwt_secret');
 };
const verifyToken =  (token, cb) => {
    const decode = jwt.decode(token, 'unsafe_jwt_secret');
    if (!decode) return cb(new Error('Token is not verified.'));
    cb(null, decode);
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
};
