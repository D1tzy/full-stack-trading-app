const router = require('express').Router()
const methodNotAllowed = require("../utils-routes/methodNotAllowed")
const controller = require("./bots.controller")

router.route("/:market/:id").get(controller.read).put(controller.update).delete(controller.delete).all(methodNotAllowed)

router.route("/:market").get(controller.list).post(controller.create).all(methodNotAllowed)

router.route("/").get(controller.list).all(methodNotAllowed)

module.exports = router