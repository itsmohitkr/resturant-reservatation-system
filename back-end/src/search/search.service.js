const knex = require("../db/connection");

const tableName = "reservations";
function listByMobileNumber(mobile_number,user_id) {
  return knex(tableName)
    .select("*")
    .where({user_id, mobile_number: mobile_number })
    .orderBy("reservation_time");
}

module.exports = {

  listByMobileNumber,

};