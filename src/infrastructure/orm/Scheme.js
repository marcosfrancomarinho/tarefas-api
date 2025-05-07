//@ts-check
import { DataTypes } from 'sequelize';
import { Database } from './Database.js';

export class Scheme {
  static model() {
    const sequelize = Database.connect();

    if (!sequelize.models.Todo) {
      sequelize.define(
        'Todo',
        {
          id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
          },
        },
        {
          tableName: 'todos',
          timestamps: false,
        }
      );
    }

    return sequelize.models.Todo;
  }

  static async migrate() {
    const model = this.model();
    await model.sync({ force: true });
    console.log('Tabela sincronizada com o banco de dados.');
  }
}
