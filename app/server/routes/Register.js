const helper = require("../util/helper");
const users = require("../model/users/users");

module.exports.get = async function(req, res) {
  if (await helper.routeGuard(req)) {
    res.status(200).redirect("/");
  } else {
    res.status(200).render("register");
  }
};
module.exports.post = async function(req, res) {
  const { username, email, password, confirmPassword } = req.body;
  let errors = [];
  if (password !== confirmPassword)
    errors.push("Password and confirm password do not match");
  if (username.length < 6 || username.length > 40)
    errors.push("Username has to be of size more than 6 and less than 40");

  try {
    const emailExists = await users.emailExists(email);
    const usernameExists = await users.usernameExists(username);

    if (emailExists)
      errors.push("The email you are trying to register already exists");
    if (usernameExists)
      errors.push("The username you are trying to register already exists");

    if (errors.length === 0) {
      await users.addUser(username, email, password);
      res.status(200).redirect("/login");
    } else res.status(200).render("register", { errors });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
