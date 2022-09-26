const { Router } = require("express");
const router = Router();

const scoreController = require("../controllers/score.controller");

router.route("/:level").get(scoreController.getTopScore);

module.exports = router;
