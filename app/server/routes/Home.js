const moment = require('moment');
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
            if (hit.created_at_i) {
              hit.created_at_i = moment
                .unix(hit.created_at_i)
                .from(moment.now(), true);
            }
            return hit;
          });
          res.status(200).render('home', {
            hits: data.hits,
            count: data.nbHits,
            recordsPerPage: data.hitsPerPage,
            pageButtonCount: 5,
            page: data.page,
            base_url: helper.generateURL(req.query),
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Internal server error');
        });
    }
  }
};
