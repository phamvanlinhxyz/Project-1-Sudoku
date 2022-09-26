const Score = require("../models/score.model");

/**
 * Lưu điểm mới
 * @param {object} score Score mới
 * Created by: linhpv (21/08/2022)
 */
const saveScoreService = async (score) => {
  const newScore = new Score(score);
  await newScore.save();
};

/**
 * Lấy danh sách top điểm
 * @returns danh sách top điểm
 * Created by: linhpv (20/08/2022)
 */
const getTopScoreService = async (level) => {
  const topScore = await Score.find({ level }).sort({ solveTime: 1 }).limit(8);

  return topScore;
};

module.exports = {
  saveScoreService,
  getTopScoreService,
};
