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
    const username = await getUsername(req.session.token);
    const history = await userModel.getHistory(username);
    res.status(200).render('history', { history });
  }
};
