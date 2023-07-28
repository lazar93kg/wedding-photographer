const express = require('express');

// login controlors
const { signup, signin } = require('../controllers/auth.js');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;