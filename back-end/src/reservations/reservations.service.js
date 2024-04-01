const knex = require("../db/connection");

const tableName = "reservations";
function create(reservation) {
  return knex(tableName)
    .insert(reservation)
    .returning("*")
    .then((created) => created[0]);
}
  function list(date) {
    return knex(tableName)
      .select("*")
      .where({ reservation_date: date})
      .orderBy("reservation_time");
  }
function read(reservation_id) {
  return knex(tableName).select("*").where({ reservation_id }).first();
}

function update(updatedReservation) {
  return knex(tableName)
    .select("*")
    .where({ reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
  create,
  list,
  read,
  update
};