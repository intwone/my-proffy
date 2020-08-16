import Knex from 'knex';

// changes made to the database
export async function up(knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('created_at')
      .defaultTo('now()')
      .notNullable();
  })
}

// rollback
export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
} 