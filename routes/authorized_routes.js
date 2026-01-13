const router = require("express").Router();
const controller = require("../controller/authorized_controllers")
const {authorize, authenticate}= require("../middleware/jwtAuth")
router.get("/:user",authenticate, authorize,controller.user_page_priv_render)



module.exports = router