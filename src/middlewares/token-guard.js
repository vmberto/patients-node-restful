
const userService = require('../services/user.service');
const noAuthRoutes = require('../utils/noauth-routes');

function getTokenFromHeaders(headers) {
  const header = headers.authorization;

  if (!header) return header

  return header.split(' ')[1]
}

function getTokenFromQueryParams(queryParams) {
  const authorization = queryParams.authorization;

  if(!authorization) return authorization;

  return authorization.split(' ')[1];
}

const tokenGuard = () => (req, res, next) => {
  const token = getTokenFromHeaders(req.headers) || getTokenFromQueryParams(req.query);
  
  let isNoAuthRoute = noAuthRoutes(req.url);
  
  const hasAccess = userService.verifyToken(token);
  
  hasAccess.then(access => {
    if (!access && !isNoAuthRoute) return res.status(403).send({ message: 'No access' })
    next()
  });

};

module.exports = tokenGuard;
