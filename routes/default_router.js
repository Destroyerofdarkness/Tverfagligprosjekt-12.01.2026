const router = require("express").Router();

const controller = require("../controller/default_controller.js")

router.get("/",controller.render_home);



module.exports = router;