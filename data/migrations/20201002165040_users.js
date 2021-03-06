exports.up = function (knex) {
  return knex.schema
    .createTable("roles", tbl => {
      tbl.increments();
      tbl.string("role", 128)
        .notNullable()
        .unique();
    })
    .createTable("users", tbl => {
      tbl.increments();
      tbl.text("username", 18)
        .unique()
        .notNullable()
      tbl.text("password", 256)
        .notNullable()
      tbl.integer("role")
        .unsigned()
        .references("roles.id")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE")
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("roles").dropTableIfExists("users");
};