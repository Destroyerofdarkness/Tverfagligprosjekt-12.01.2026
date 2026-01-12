const router = require("express").Router();
const controller = require("../controller/auth_controller.js");

router.get("/sign-in",controller.render_login)

router.get("/sign-up",controller.render_register)

router.post("/sign-up", controller.sign_up_user)

module.exports = router