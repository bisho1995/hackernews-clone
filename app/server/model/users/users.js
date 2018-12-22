var bcrypt = require("bcryptjs");
const model = require("./schema");

module.exports.addUser = function(username, email, password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) reject(err);
      else {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) reject(err);
          else {
            const user = new model({
              username,
              email,
              password: hash
            });
            user.save((err, doc) => {
              if (err) reject(err);
              else resolve(doc);
            });
          }
        });
      }
    });
  });
};

module.exports.usernameExists = function(username) {
  return new Promise((resolve, reject) => {
    model.find({ username }, function(err, docs) {
      if (err) reject(err);
      else {
        if (docs.length) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

module.exports.usernameOrEmailExists = function(user) {
  return new Promise((resolve, reject) => {
    model.find({ $or: [{ username: user }, { email: user }] }, function(
      err,
      docs
    ) {
      if (err) reject(err);
      else {
        if (docs.length) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

module.exports.getPassword = function(user) {
  return new Promise((resolve, reject) => {
    model
      .findOne({ $or: [{ email: user }, { username: user }] })
      .exec((err, res) => {
        if (err) reject(err);
        else resolve(res.password);
      });
  });
};

module.exports.emailExists = function(email) {
  return new Promise((resolve, reject) => {
    model.find({ email }, function(err, docs) {
      if (err) reject(err);
      else {
        if (docs.length) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
};

module.exports.userData = function(username) {
  return new Promise((resolve, reject) => {
    model.findOne({ username }, function(err, doc) {
      if (err) reject(err);
      else {
        resolve(doc);
      }
    });
  });
};
