const { constants } = require("../contants");

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({ title: "Validation Error", msg: error.message });
      break;

    case constants.UNAUTHORIZED:
      res.json({ title: "Unauthorized", msg: error.message });
      break;
    case constants.FORBIDDEN:
      res.json({ title: "Forbidden", msg: error.message });
      break;

    case constants.NOT_FOUND:
      res.json({ title: "Not Found", msg: error.message });

    case constants.SERVER_ERROR:
      res.json({ title: "Server Error", msg: error.message });
    default:
      break;
  }
};

module.exports = errorHandler;
