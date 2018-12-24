const helper = require('../util/helper');

module.exports = (req, res) => {
  const { dateRange, queryParams } = req.body;
  const queryParamsGenerated =    helper.generateURLforDateRange(JSON.parse(queryParams)) + dateRange;
  res.status(200).redirect(`/${queryParamsGenerated}`);
};
