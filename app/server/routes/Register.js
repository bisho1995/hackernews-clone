module.exports.get = function(req, res) {
  res.status(200).render("register");
};
module.exports.post = function(req, res) {
  console.log(req.body);
  const { username, email, password, confirmPassword } = req.body;
  let errors = [];
  if (password !== confirmPassword)
    errors.push("Password and confirm password do not match");
  if (username.length < 6 || username.length > 40)
    errors.push("Username has to be of size more than 6 and less than 40");

  if (errors.length === 0) {
    res.status(200).send("post successful");
  } else {
    res.status(200).render("register", { errors });
  }
};
