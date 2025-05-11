//@ts-check
import { Done } from '../../domain/valuesobject/Done.mjs';
import { ID } from '../../domain/valuesobject/ID.mjs';
import { client } from './Client.mjs';

export class SequelizeCompleteTask {
  /**
   * @param {ID} id
   * @param {Done} done
   * @returns {Promise<ID | null>}
   */
  async markAsDone(id, done) {
    const taskId = id.getValue();
    const taskStatus = done.getValue();
    const [affectedRows] = await client.update({ done: taskStatus }, { where: { id: taskId } });
    if (affectedRows === 0) return null;
    return id;
  }
}
