exports.up = function (knex) {
  return knex.schema.createTable("table", (table) => {
    table.increments("table_id").primary();
    table.integer("user_id");
    table.string("table_name");
    table.integer("capacity");
    table.integer("reservation_id").defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("table");
};
