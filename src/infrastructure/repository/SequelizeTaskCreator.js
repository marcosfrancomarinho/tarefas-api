import { Task } from '../../domain/entities/Task.js';
import { ID } from '../../domain/valuesobject/ID.js';
import { client } from './Client.js';

export class SequelizeTaskCreator {
  /**
   * @param {Task} task
   * @returns {Promise<ID>}
   */
  async create(task) {
    const persistData = task.toPersistence();
    const createdTask = await client.create({ ...persistData });
    const { id } = createdTask.toJSON();
    const idGenereted = ID.create(id);
    return idGenereted;
  }
}
