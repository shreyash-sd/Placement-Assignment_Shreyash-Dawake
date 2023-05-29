const express = require('express');
const router = express.Router();
const { signup, login, protectedRoute } = require('./controllers');

router.post('/signup', signup);
router.post('/login', login);
router.get('/protected', protectedRoute);

module.exports = router;
