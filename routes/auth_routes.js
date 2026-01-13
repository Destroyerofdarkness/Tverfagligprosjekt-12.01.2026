const router = require("express").Router();
const controller = require("../controller/auth_controller.js");

router.get("/sign-in",controller.render_login)

router.get("/sign-up",controller.render_register)

router.get("/sign-out",controller.sign_out_user)

router.post("/sign-up", controller.sign_up_user)

router.post("/sign-in",controller.sign_in_user)

module.exports = router