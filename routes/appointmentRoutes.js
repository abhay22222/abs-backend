const express = require("express");
const router = express.Router();
const controller = require("../controllers/appointmentController");
router.post("/", auth, controller.create);
router.get("/", controller.getAll);
router.delete("/:id", controller.delete);
router.put("/:id", controller.update);
module.exports = router;