const queries = require("../queries");

exports.login = async (username, password) => {
  const res = await queries.getUserByUsername(username);
  if (res.length == 0) return false;
  const passwordDB = res[0].password;
  if (password == passwordDB) {
    return true;
  } else {
    return false;
  }
};

exports.logout = (req, res, next) => {};

exports.register = (username, password, email) => {
  queries.createNewUser(username, password, email);
  return;
};

exports.forgotPassword = (req, res, next) => {};

exports.getProfile = (req, res, next) => {};

exports.updateProfile = (req, res, next) => {};

exports.changePassword = (req, res, next) => {};
