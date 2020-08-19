const connection = require("./knexfile");
const database = require("knex")(connection);

module.exports = {
  getUserByUsername(username) {
    return database("users").where({ username }).select("password");
  },
  createNewUser(username, password, email) {
    const res = database("users").insert({
      username,
      password,
      email
    }).then(()=>{});
    return;
  },
};
