const helper = require('../util/helper');

module.exports = (req, res) => {
  const { type, queryParams } = req.body;
  const queryParamsGenerated =    helper.generateURLforType(JSON.parse(queryParams)) + type;
  res.status(200).redirect(`/${queryParamsGenerated}`);
};
