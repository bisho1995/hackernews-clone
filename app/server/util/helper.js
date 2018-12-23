const config = require('config');
const url = require('url');
const jwt = require('jsonwebtoken');
const user = require('../model/users/users');

module.exports.routeGuard = async (req) => {
  const { token } = req.session;
  if (!token) return false;

  try {
    const userNameOrEmail = jwt.verify(token, config.get('SECRET')).user;
    const result = await user.usernameOrEmailExists(userNameOrEmail);
    if (result) return true;
    return false;
  } catch (err) {
    return false;
  }
};

module.exports.getUserFromJWT = token => jwt.verify(token, config.get('SECRET')).user;

module.exports.defaultQueryParams = () => '?sort=&prefix=&page=&dateRange=&type=';

module.exports.hasAllQs = (params) => {
  let b = true;
  if (params === undefined || params === null) return false;
  const {
 sort, prefix, page, dateRange, type, query 
} = params;
  if (
    sort === undefined
    || prefix === undefined
    || page === undefined
    || dateRange === undefined
    || type === undefined
    || query === undefined
  ) {
    b = false;
  }
  return b;
};

module.exports.fillUpQueryParams = (params, payload) => {
  let {
 sort, prefix, page, dateRange, type, query 
} = params;
  if (payload) {
    sort = sort || payload.sort || '';
    prefix = prefix || payload.prefix || '';
    page = page || payload.page || '';
    dateRange = dateRange || payload.dateRange || '';
    type = type || payload.type || '';
    query = query || payload.query || '';
  } else {
    sort = sort || '';
    prefix = prefix || '';
    page = page || '';
    dateRange = dateRange || '';
    type = type || '';
    query = query || '';
  }

  return `?query=${query}&sort=${sort}&prefix=${prefix}&page=${page}&dateRange=${dateRange}&type=${type}`;
};

module.exports.generateURL = (params, payload) => {
  let {
 sort, prefix, dateRange, type, query 
} = params;
  if (payload) {
    sort = sort || payload.sort || '';
    prefix = prefix || payload.prefix || '';
    dateRange = dateRange || payload.dateRange || '';
    type = type || payload.type || '';
    query = query || payload.query || '';
  } else {
    sort = sort || '';
    prefix = prefix || '';
    dateRange = dateRange || '';
    type = type || '';
    query = query || '';
  }
  return `/?query=${query}&sort=${sort}&prefix=${prefix}&dateRange=${dateRange}&type=${type}&page=`;
};
