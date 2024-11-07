const router = require("express").Router();

const appController = require("../controllers/appController");

router.get("/", appController.start);

module.exports = router;