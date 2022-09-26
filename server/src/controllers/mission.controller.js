const missionService = require("../services/mission.service");
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
  console.log(error);
  response.sendError(
    res,
    enums.statusCode.INTERNAL_SERVER_ERROR,
    error.message
  );
};

/**
 * Lấy câu hỏi mới
 * @param {Request} req request
 * @param {Response} res response
 * Created by: linhpv (20/08/2022)
 */
const getMission = (req, res) => {
  try {
    // Check params
    if (isNaN(parseInt(req.params.level))) {
      return response.sendError(
        res,
        enums.statusCode.BAD_REQUEST,
        resources.errorMsg.params
      );
    }

    const newMission = missionService.getMissionService(req.params.level);
    response.sendSuccess(res, newMission, "");
  } catch (error) {
    handleException(res, error);
  }
};

/**
 * Kiểm tra kết quả
 * @param {Request} req request
 * @param {Response} res response
 * Created by: linhpv (20/08/2022)
 */
const checkSolution = async (req, res) => {
  try {
    if (!req.body) {
      return response.sendError(
        res,
        enums.statusCode.BAD_REQUEST,
        resources.checkMsg.incorrect
      );
    }

    const isSuccess = missionService.checkSolutionService(req.body.solution);
    // Nếu không chính xác => trả về lỗi
    if (!isSuccess) {
      return response.sendError(
        res,
        enums.statusCode.BAD_REQUEST,
        resources.checkMsg.incorrect
      );
    }
    // Nếu thành công thì lưu điểm và trả về thông báo
    await scoreService.saveScoreService(req.body);
    response.sendSuccess(res, null, resources.checkMsg.exactly);
  } catch (error) {
    handleException(res, error);
  }
};

module.exports = {
  getMission,
  checkSolution,
};
