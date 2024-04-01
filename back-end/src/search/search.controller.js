const service = require("./search.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function listByMobileNumber(req, res) {
    const { mobile_number } = req.query;
    const data = await service.listByMobileNumber(mobile_number);
  res.json({ data });
}

module.exports = {
  listByMobileNumber,
};
