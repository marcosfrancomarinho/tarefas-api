import { Task } from '../../domain/entities/Task.js';
import { Done } from '../../domain/valuesobject/Done.js';
import { ID } from '../../domain/valuesobject/ID.js';
import { Name } from '../../domain/valuesobject/Name.js';
import { client } from './Client.js';

export class SequelizeTaskFinder {
  /**
   * @returns {Promise<Task[]>}
   */
  async findAll() {
    const tasksFound = await client.findAll({ raw: true });
    const tasks = tasksFound.map(({ id, name, done }) => {
      return Task.create(ID.create(id), Name.create(name), Done.create(!!done));
    });
    return tasks;
  }

  /**
   * @param {ID} id
   * @returns {Promise<Task | null>}
   */
  async findById(id) {
    const taskId = id.getValue();
    const tasksFound = await client.findOne({ where: { id: taskId }, raw: true });
    if (!tasksFound) return null;
    const task = Task.create(ID.create(tasksFound.id), ID.create(tasksFound.name), Done.create(tasksFound.done));
    return task;
  }
}


