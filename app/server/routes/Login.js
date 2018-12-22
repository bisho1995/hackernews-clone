const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const user = require("../model/users/users");
const helper = require("../util/helper");

module.exports.get = async function(req, res) {
  if (await helper.routeGuard(req)) {
    res.status(200).redirect("/");
  } else {
    res.status(200).render("login");
  }
};
module.exports.post = async function(req, res) {
  const { username, password } = req.body;
  let errors = [];

  try {
    const result = await user.usernameOrEmailExists(username);
    if (!result) errors.push("The username or email does not exist");
    else {
      const hash = await user.getPassword(username);
      bcrypt.compare(password, hash, function(err, result) {
        if (result === false) errors.push("Incorrect username or password");

        if (errors.length === 0) {
          const token = jwt.sign({ user: username }, config.get("SECRET"));
          req.session.token = token;
          res.status(200).redirect("/");
        } else res.status(200).render("login", { errors });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
