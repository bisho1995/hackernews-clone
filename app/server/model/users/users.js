const bcrypt = require('bcryptjs');
const model = require('./schema');

module.exports.addUser = (username, email, password) => new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      else {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) reject(err);
          else {
            const user = new model({
              username,
              email,
              password: hash,
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

module.exports.getUsername = user => new Promise((resolve, reject) => {
    model
      .findOne({ $or: [{ username: user }, { email: user }] })
      .exec((err, user) => {
        if (err) reject(err);
        resolve(user.username);
      });
  });

module.exports.usernameExists = function (username) {
  return new Promise((resolve, reject) => {
    model.find({ username }, (err, docs) => {
      if (err) reject(err);
      else if (docs.length) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports.usernameOrEmailExists = function (user) {
  return new Promise((resolve, reject) => {
    model.find({ $or: [{ username: user }, { email: user }] }, (err, docs) => {
      if (err) reject(err);
      else if (docs.length) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports.getPassword = function (user) {
  return new Promise((resolve, reject) => {
    model
      .findOne({ $or: [{ email: user }, { username: user }] })
      .exec((err, res) => {
        if (err) reject(err);
        else resolve(res.password);
      });
  });
};

module.exports.emailExists = function (email) {
  return new Promise((resolve, reject) => {
    model.find({ email }, (err, docs) => {
      if (err) reject(err);
      else if (docs.length) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

module.exports.userData = function (username) {
  return new Promise((resolve, reject) => {
    model.findOne({ username }, (err, doc) => {
      if (err) reject(err);
      else {
        resolve(doc);
      }
    });
  });
};

module.exports.getHistory = user => new Promise((resolve, reject) => {
    model.findOne({ username: user }).exec((err, doc) => {
      if (err) reject(err);
      else resolve(doc.history);
    });
  });

module.exports.updateHistory = (user, history) => new Promise((resolve, reject) => {
    model
      .findOneAndUpdate({ username: user }, { history })
      .exec((err, doc) => {
        if (err) reject(err);
        else resolve(doc);
      });
  });
