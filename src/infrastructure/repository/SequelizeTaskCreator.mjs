import { Task } from '../../domain/entities/Task.mjs';
import { ID } from '../../domain/valuesobject/ID.mjs';
import { client } from './Client.mjs';

export class SequelizeTaskCreator {
  /**
   * @param {Task} task
   * @returns {Promise<ID>}
   */
  async create(task) {
    const taskData = task.toPersistence();
    const createdRecord = await client.create({ ...taskData });
    const { id } = createdRecord.toJSON();
    const taskId = ID.create(id);
    return taskId;
  }
}
