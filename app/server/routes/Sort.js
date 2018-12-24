const helper = require('../util/helper');

module.exports = async (req, res) => {
  if (!(await helper.routeGuard(req))) {
    res.status(200).redirect('/login');
  } else {
    const { sort, queryParams } = req.body;
    const queryParamsGenerated =      helper.generateURLforSort(JSON.parse(queryParams)) + sort;
    res.status(200).redirect(`/${queryParamsGenerated}`);
  }
};
