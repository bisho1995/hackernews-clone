const config = require("config");
const jwt = require("jsonwebtoken");
const user = require("../model/users/users");

module.exports.routeGuard = async function(req) {
  const token = req.session.token;
  if (!token) return false;
  else {
    try {
      const userNameOrEmail = jwt.verify(token, config.get("SECRET")).user;
      const result = await user.usernameOrEmailExists(userNameOrEmail);
      if (result) return true;
      else return false;
    } catch (err) {
      return false;
    }
  }
};
