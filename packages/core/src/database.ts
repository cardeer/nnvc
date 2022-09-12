import knex, { Knex } from "knex";

export class DB {
  static connection: Knex;
}

export default function initConnection() {
  try {
    DB.connection = knex({
      client: process.env.DB_CLIENT,
      connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      },
    });
  } catch (e) {
    console.log(`Error when create connection: ${e}`);
  }
}
