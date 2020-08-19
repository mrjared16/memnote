var express = require("express");
var router = express.Router();
const userController = require("../controllers/user");

router.post("/login", async function (req, res, next) {
  const { username, password } = req.body.params;
  const authenticated = await userController.login(
    username,
    password
  );
  if (authenticated == true) {
    return res.send({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    });
  }
  return res.status(401).send({
    message: "Username or password are incorrect",
  });
});

router.post("/logout", function (req, res, next) {});

router.post("/register", function (req, res, next) {
  const { username, password, email } = req.body.params;
  userController.register(username, password, email);
  return res.status(201).send({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  });
});

router.post("/forgotPassword", function (req, res, next) {});

router.get("/profile", function (req, res, next) {});

router.patch("/profile", function (req, res, next) {});

router.patch("/changePassword", function (req, res, next) {});

router.post("/search", function (req, res, next) {});

module.exports = router;
