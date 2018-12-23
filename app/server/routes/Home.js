const helper = require('../util/helper');

module.exports = async (req, res) => {
  if (!(await helper.routeGuard(req))) {
    res.status(200).redirect('/login');
  } else {
    console.log();
    if (!helper.hasAllQs(req.query)) {
      res.status(200).redirect(`/${helper.fillUpQueryParams(req.query)}`);
    } else {
      res.status(200).render('home');
    }
  }
};
