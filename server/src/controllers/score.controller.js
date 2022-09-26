const scoreService = require("../services/score.service");
const response = require("../libs/response");
const enums = require("../utils/enums");
const resources = require("../utils/resources");

/**
 * Xử lý exception
 * @param {Request} res
 * @param {any} error
 * Created by: linhpv (20/08/2022)
 */
const handleException = (res, error) => {
  response.sendError(
    res,
    enums.statusCode.INTERNAL_SERVER_ERROR,
    error.message
  );
};

/**
 * Lấy danh sách top điểm
 * @param {Request} req request
 * @param {Response} res response
 * Created by: linhpv (20/08/2022)
 */
const getTopScore = async (req, res) => {
  if (isNaN(parseInt(req.params.level))) {
    return response.sendError(
      res,
      enums.statusCode.BAD_REQUEST,
      resources.errorMsg.params
    );
  }

  try {
    const topScore = await scoreService.getTopScoreService(req.params.level);
    response.sendSuccess(res, topScore, "");
  } catch (error) {
    handleException(res, error);
  }
};

module.exports = {
  getTopScore,
};
