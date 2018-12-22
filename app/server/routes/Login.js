const bcrypt = require("bcryptjs");
const user = require("../model/users/users");

module.exports.get = function(req, res) {
  res.status(200).render("login");
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

        if (errors.length === 0) res.status(200).redirect("/");
        else res.status(200).render("login", { errors });
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};
