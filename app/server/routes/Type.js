const helper = require('../util/helper');

module.exports = (req, res) => {
  const { type } = req.body;
  const queryParams = helper.generateURLforType(req.query) + type;
  res.status(200).redirect(`/${queryParams}`);
};
