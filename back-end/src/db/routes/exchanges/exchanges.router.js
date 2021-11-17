const router = require('express').Router()
const methodNotAllowed = require("../utils-routes/methodNotAllowed")


router.route("/:id").get(controller.read).put(controller.update).all(methodNotAllowed)

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)


module.exports = router