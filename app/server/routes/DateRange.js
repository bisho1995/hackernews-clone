const helper = require('../util/helper');

module.exports = (req, res) => {
  const { dateRange } = req.body;
  const queryParams = helper.generateURLforDateRange(req.query) + dateRange;
  console.log(queryParams);
  res.status(200).redirect(`/${queryParams}`);
};
