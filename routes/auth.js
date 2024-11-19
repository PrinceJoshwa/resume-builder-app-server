// const express = require('express');
// const router = express.Router();
// const { googleLogin } = require('../controllers/authController');

// router.post('/google', googleLogin);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { googleLogin } = require('../controllers/authController');

// Google login route
router.post('/google', googleLogin);

module.exports = router;
