const helper = require('../util/helper');

module.exports = (req, res) => {
  const { search, queryParams } = req.body;
  const queryParamsGenerated =    helper.generateURLforSearch(JSON.parse(queryParams)) + search;
  res.status(200).redirect(`/${queryParamsGenerated}`);
};
