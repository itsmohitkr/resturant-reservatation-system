const service = require("./search.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function listByMobileNumber(req, res,next) {
  const { mobile_number = {} } = req.query;
  if (!mobile_number) {
    next({
      status: 400,
      message:"Mobile number should not be empty."
    })
  }
  else {
    const data = await service.listByMobileNumber(mobile_number);
    res.json({ data });
  }
}

module.exports = {
  listByMobileNumber:[asyncErrorBoundary(listByMobileNumber)],
};
