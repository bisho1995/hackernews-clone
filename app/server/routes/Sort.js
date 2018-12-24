const helper = require('../util/helper');

module.exports = (req, res) => {
  const { sort, queryParams } = req.body;
  const queryParamsGenerated =    helper.generateURLforSort(JSON.parse(queryParams)) + sort;
  res.status(200).redirect(`/${queryParamsGenerated}`);
};
