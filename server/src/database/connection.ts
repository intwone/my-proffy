import knex from 'knex';
import path from 'path';

const database = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault: true, // for default content return null
});

export default database;