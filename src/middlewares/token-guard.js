
const userService = require('../services/user.service');

function getTokenFromHeaders(headers) {
  const header = headers.authorization;

  if (!header)
    return header

  return header.split(' ')[1]
}

const tokenGuard = () => (req, res, next) => {
  const token = getTokenFromHeaders(req.headers);

  let loginRequest;
  if(req.url === '/api/login') loginRequest = true;
  
  const hasAccess = userService.verifyToken(token)
  
  hasAccess.then(access => {
    if (!access && !loginRequest) return res.status(403).send({ message: 'No access' })
    next()
  });

};

module.exports = tokenGuard;
