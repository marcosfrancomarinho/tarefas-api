import { Tasck } from '../../domain/entities/Tasck.js';
import { ID } from '../../domain/valuesobject/ID.js';
import { client } from './Client.js';

export class SequelizeTasckCreator {
  /**
   * @param {Tasck} tasck
   * @returns {Promise<ID>}
   */
  async create(tasck) {
    const persistData = tasck.toPersistence();
    const createdTasck = await client.create({ ...persistData });
    const { id } = createdTasck.toJSON();
    const idGenereted = ID.create(id);
    return idGenereted;
  }
}
