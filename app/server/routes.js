const Home = require("./routes/Home");
const Login = require("./routes/Login");
const Register = require("./routes/Register");

module.exports = app => {
  app.get("/", Home);
  app.get("/login", Login.get);
  app.post("/login", Login.post);
  app.get("/register", Register);
};
