const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/auth", userController.auth);
router.post("/signIn", userController.signIn);
router.post("/signUp", userController.signUp);
router.get("/logout", userController.logOut);

module.exports = router;
