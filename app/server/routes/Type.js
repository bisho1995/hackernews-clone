const helper = require('../util/helper');

module.exports = async (req, res) => {
  if (!(await helper.routeGuard(req))) {
    res.status(200).redirect('/login');
  } else {
    const { type, queryParams } = req.body;
    const queryParamsGenerated =      helper.generateURLforType(JSON.parse(queryParams)) + type;
    res.status(200).redirect(`/${queryParamsGenerated}`);
  }
};
