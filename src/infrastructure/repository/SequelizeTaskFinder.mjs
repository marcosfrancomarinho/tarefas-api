import { Task } from '../../domain/entities/Task.mjs';
import { Done } from '../../domain/valuesobject/Done.mjs';
import { ID } from '../../domain/valuesobject/ID.mjs';
import { Name } from '../../domain/valuesobject/Name.mjs';
import { client } from './Client.mjs';

export class SequelizeTaskFinder {
  /** @returns {Promise<Task[]>}*/
  async findAll() {
    const rawTasks = await client.findAll({ raw: true });
    return rawTasks.map(({ id, name, done }) => {
      return Task.create(
        ID.create(id),
        Name.create(name),
        Done.create(!!done)
      );
    });
  }

  /**
   * @param {ID} id
   * @returns {Promise<Task | null>}
   */
  async findById(id) {
    const taskIdValue = id.getValue();
    const rawTask = await client.findOne({ where: { id: taskIdValue }, raw: true });
    if (!rawTask) return null;

    return Task.create(
      ID.create(rawTask.id),
      Name.create(rawTask.name), 
      Done.create(!!rawTask.done)
    );
  }
}
