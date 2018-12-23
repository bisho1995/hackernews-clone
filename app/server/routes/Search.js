const helper = require('../util/helper');

module.exports = (req, res) => {
  const { search } = req.body;
  const queryParams = helper.generateURLforSearch(req.query) + search;
  res.status(200).redirect(`/${queryParams}`);
};
