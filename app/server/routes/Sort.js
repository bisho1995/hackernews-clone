const helper = require('../util/helper');

module.exports = (req, res) => {
  const { sort } = req.body;
  const queryParams = helper.generateURLforSort(req.query) + sort;
  res.status(200).redirect(`/${queryParams}`);
};
