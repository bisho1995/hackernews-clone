const helper = require('../util/helper');
const api = require('../Controllers/api');

module.exports = async (req, res) => {
  if (!(await helper.routeGuard(req))) {
    res.status(200).redirect('/login');
  } else {
    console.log();
    if (!helper.hasAllQs(req.query)) {
      res.status(200).redirect(`/${helper.fillUpQueryParams(req.query)}`);
    } else {
      api(req.query)
        .then((data) => {
          data.hits.map((hit) => {
            if (hit.url === null) hit.url = '#';
            if (hit.points === null) hit.points = '0';
            if (hit.author === null) hit.author = '';
            if (hit.num_comments === null) hit.num_comments = '0';
            return hit;
          });
          console.log(data.hits);
          res.status(200).render('home', { hits: data.hits });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Internal server error');
        });
    }
  }
};
