const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");

// router.post('/signin', authMiddelware.authJwt);
router.post('/signup', controller.signup);
router.post('/signin', controller.signin);

module.exports = router;