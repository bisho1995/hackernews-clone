module.exports.get = function(req, res) {
  res.status(200).render("login");
};
module.exports.post = function(req, res) {
  console.log(req.body);
  res.status(200).send("Login post");
};
