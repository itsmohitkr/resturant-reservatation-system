const knex = require("../db/connection");
const tableName = "table";

function list(date) {
    return knex(tableName)
      .select("*")
      
      .orderBy("table_name");
}

function create(table) {
  return knex(tableName)
    .insert(table)
    .returning("*")
    .then((created) => created[0]);
}

function read(table_id) {
  return knex(tableName).select("*").where({ table_id }).first();
}

function update(updatedTable) {
  return knex(tableName)
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then((updatedRecords) => updatedRecords[0]);
}
async function seat(updatedTable, updatedReservation) {
  
  const trx = await knex.transaction();
  return trx(tableName)
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then(function () {
      return trx("reservations")
        .select("*")
        .where({ reservation_id: updatedReservation.reservation_id })
        .update(updatedReservation, "*");
    })
    .then(trx.commit)
    .catch(trx.rollback);
}


module.exports = {
  create,
  list,
  read,
  update,
  seat,
};