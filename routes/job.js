const express = require("express");
const router = express.Router();
const controller = require("../controllers/job");

// router.post('/signin', authMiddelware.authJwt);
router.post('/create_job', controller.createJob);
router.put('/update_job', controller.updateJob);

module.exports = router;