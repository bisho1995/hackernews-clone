module.exports = app => {
  app.get("/", function(req, res) {
    res.status(200).send("Working");
  });
};
