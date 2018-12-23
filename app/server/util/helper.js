const config = require('config');
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

module.exports.defaultQueryParams = () => '?sort=&prefix=&page=&dateRange=&type=';

module.exports.hasAllQs = (query) => {
  let b = true;
  if (query === undefined || query === null) return false;
  const {
 sort, prefix, page, dateRange, type 
} = query;
  if (
    sort === undefined
    || prefix === undefined
    || page === undefined
    || dateRange === undefined
    || type === undefined
  ) {
    b = false;
  }
  return b;
};

module.exports.fillUpQueryParams = (query, payload) => {
  let {
 sort, prefix, page, dateRange, type 
} = query;
  if (payload) {
    sort = sort || payload.sort || '';
    prefix = prefix || payload.prefix || '';
    page = page || payload.page || '';
    dateRange = dateRange || payload.dateRange || '';
    type = type || payload.type || '';
  } else {
    sort = sort || '';
    prefix = prefix || '';
    page = page || '';
    dateRange = dateRange || '';
    type = type || '';
  }

  return `?sort=${sort}&prefix=${prefix}&page=${page}&dateRange=${dateRange}&type=${type}`;
};
