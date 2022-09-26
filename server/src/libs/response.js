const enums = require("../utils/enums");

/**
 * Trả về response thành công
 * @param {*} res response
 * @param {*} data data trả về
 * @param {*} msg thông báo nếu có
 * Created by: linhpv (20/08/2022)
 */
const sendSuccess = (res, data, msg) => {
  res.status(enums.statusCode.OK).json({
    success: true,
    data,
    msg,
  });
};

/**
 * Trả về lỗi
 * @param {*} res response
 * @param {*} statusCode mã lỗi
 * @param {*} msg thông báo
 * Created by: linhpv (20/08/2022)
 */
const sendError = (res, statusCode, msg) => {
  res.status(statusCode).json({
    success: false,
    data: null,
    msg,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
