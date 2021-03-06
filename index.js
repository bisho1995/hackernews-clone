const http = require('http');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const config = require('config');
const helmet = require('helmet');

const app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || 3000);
app.set('views', `${__dirname}/app/server/views`);
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  },
);
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/app/public`));

process.env.DB_HOST = process.env.DB_HOST || config.get('DB_HOST');
process.env.DB_PORT = process.env.DB_PORT || config.get('DB_PORT');
process.env.DB_NAME = process.env.DB_NAME || config.get('DB_NAME');
process.env.DB_USER = process.env.DB_USER || config.get('DB_USERNAME');
process.env.DB_PASS = process.env.DB_PASS || config.get('DB_PASSWORD');

process.env.DB_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
  process.env.DB_HOST
}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

require('./app/server/model/db');

app.use(
  session({
    secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.DB_URL }),
  }),
);

require('./app/server/routes')(app);

http.createServer(app).listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});
