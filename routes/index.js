const express = require("express");
const authRouter = require("./auth");
const jobRouter = require("./job");
// const authMiddelware = require("../middleware/middlewares");
const bidRouter = require("./bid");
const userRouter = require("./users");

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/bid', bidRouter);
// router.use('/job', authMiddelware.loginRequired, jobRouter);

module.exports = router;
