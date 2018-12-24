const moment = require('moment');
const userModel = require('../model/users/users');
const helper = require('../util/helper');

async function getUsername(token) {
  const user = helper.getUserFromJWT(token);
  const username = await userModel.getUsername(user);
  return username;
}

module.exports = async (req, res) => {
  if (!(await helper.routeGuard(req))) {
    res.status(200).redirect('/login');
  } else {
    const { search, queryParams } = req.body;
    const queryParamsGenerated =      helper.generateURLforSearch(JSON.parse(queryParams)) + search;

    const username = await getUsername(req.session.token);
    const history = await userModel.getHistory(username);
    if (history.length < 5) {
      history.push({
        url: queryParamsGenerated,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    } else {
      history.shift();
      history.push({
        url: queryParamsGenerated,
        time: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    }
    console.log(await userModel.updateHistory(username, history));
    res.status(200).redirect(`/${queryParamsGenerated}`);
  }
};
