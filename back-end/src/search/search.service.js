const knex = require("../db/connection");

const tableName = "reservations";
function listByMobileNumber(mobile_number) {
  return knex(tableName)
    .select("*")
    .where({ mobile_number: mobile_number })
    .orderBy("reservation_time");
}

module.exports = {

  listByMobileNumber,

};