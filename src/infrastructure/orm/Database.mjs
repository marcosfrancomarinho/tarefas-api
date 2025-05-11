//@ts-check

import { Sequelize } from 'sequelize';

export class Database {
  /**@type {Sequelize} */
  static connection;
  /**@returns {Sequelize}*/
  static connect() {
    if (!this.connection) {
      this.connection = new Sequelize({
        dialect: 'sqlite',
        storage: 'src/infrastructure/orm/db.sqlite',
        logging: true,
      });
    }
    return this.connection;
  }
}
