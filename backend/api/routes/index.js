var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('Welcome');
});

router.post('/login', function(req, res, next) {
});

router.post('/logout', function(req, res, next) {
});

router.post('/register', function(req, res, next) {
});

router.post('/forgotPassword', function(req, res, next) {
});

router.get('/profile', function(req, res, next) {
});

router.patch('/profile', function(req, res, next) {
});

router.patch('/changePassword', function(req, res, next) {
});

router.post('/search', function(req, res, next) {
});

module.exports = router;
