const { Router } = require("express");
const router = Router();

const missionController = require("../controllers/mission.controller");

router.route("/").post(missionController.checkSolution);
router.route("/:level").get(missionController.getMission);

module.exports = router;
