const knex = require("../db/connection");

const tableName = "reservations";
function create(reservation) {
  return knex(tableName)
    .insert(reservation)
    .returning("*")
    .then((created) => created[0]);
}
function list(date, user_id) {
  if (!date) {
    return knex(tableName)
      .select("*")
      .where({ user_id: user_id })
      .orderBy("reservation_time");
  } else {
    return knex(tableName)
      .select("*")
      .where({ user_id: user_id, reservation_date: date })
      .orderBy("reservation_time");
  }
}
function read(reservation_id, user_id) {
  return knex(tableName).select("*").where({ user_id,reservation_id }).first();
}

function update(updatedReservation, user_id) {  
  return knex(tableName)
    .select("*")
    .where({ user_id, reservation_id: updatedReservation.reservation_id })
    .update(updatedReservation, "*")
    .then((updatedRecords) => updatedRecords[0]);
}
module.exports = {
  create,
  list,
  read,
  update
};