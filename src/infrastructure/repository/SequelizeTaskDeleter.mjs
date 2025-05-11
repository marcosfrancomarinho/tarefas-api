import { ID } from '../../domain/valuesobject/ID.mjs';
import { client } from './Client.mjs';

export class SequelizeTaskDeleter {
  /**
   * @param {ID} id
   * @returns {Promise<ID | null>}
   */
  async deleteById(id) {
    const taskIdValue = id.getValue(); 
    const deletedCount = await client.destroy({ where: { id: taskIdValue } });

    if (deletedCount === 0) return null;

    const deletedTaskId = ID.create(taskIdValue);
    return deletedTaskId;
  }
}
