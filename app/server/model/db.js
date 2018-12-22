const mongoose = require("mongoose");

const connection = mongoose.createConnection(process.env.DB_URL, {
  useNewUrlParser: true
});

connection.on("connected", () => {
  console.log(`Conneted to database`);
});

connection.on("error", err => {
  console.log(err);
});

process.on("SIGINT", () => {
  connection.close(() => {
    console.log("Closing database connection as applicaion is force closed");
    process.abort(0);
  });
});

module.exports = connection;
