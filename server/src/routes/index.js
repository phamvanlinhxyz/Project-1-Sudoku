const { Router } = require("express");
const router = Router();

const missionRouter = require("./mission.route");
const scoreRouter = require("./score.route");

router.use("/missions", missionRouter);
router.use("/scores", scoreRouter);

module.exports = router;
