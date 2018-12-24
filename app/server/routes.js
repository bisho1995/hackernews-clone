const Home = require('./routes/Home');
const Login = require('./routes/Login');
const Register = require('./routes/Register');
const Search = require('./routes/Search');
const Sort = require('./routes/Sort');
const Type = require('./routes/Type');
const DateRange = require('./routes/DateRange');
const History = require('./routes/History');

module.exports = (app) => {
  app.get('/', Home);

  app.get('/login', Login.get);
  app.post('/login', Login.post);

  app.get('/register', Register.get);
  app.post('/register', Register.post);

  app.post('/search', Search);
  app.post('/sort', Sort);
  app.post('/type', Type);
  app.post('/dateRange', DateRange);

  app.get('/history', History);
};
