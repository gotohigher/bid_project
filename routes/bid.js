const express = require("express");
const router = express.Router();
const controller = require("../controllers/bid");

// router.post('/signin', authMiddelware.authJwt);
router.post('/insert', controller.createBid);
router.get('/getAll', controller.getAll);
router.put('/update', controller.updateBid);
router.delete('/:id', controller.delete);
router.get('/getById', controller.getById);
// router.post('/signin', controller.signin);

module.exports = router;