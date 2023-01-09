const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

// router.post('/signin', authMiddelware.authJwt);
router.get('/', controller.getUsers);
// router.post('/signin', controller.signin);

module.exports = router;