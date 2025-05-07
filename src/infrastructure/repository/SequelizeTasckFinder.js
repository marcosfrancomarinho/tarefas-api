import { Tasck } from '../../domain/entities/Tasck.js';
import { Done } from '../../domain/valuesobject/Done.js';
import { ID } from '../../domain/valuesobject/ID.js';
import { Name } from '../../domain/valuesobject/Name.js';
import { client } from './Client.js';

export class SequelizeTasckFinder {
  /**
   * @returns {Promise<Tasck[]>}
   */
  async findAll() {
    const tascksFound = await client.findAll({ raw: true });
    const tascks = tascksFound.map(({ id, name, done }) => {
      return Tasck.create(ID.create(id), Name.create(name), Done.create(!!done));
    });
    return tascks;
  }

  /**
   * @param {ID} id
   * @returns {Promise<Tasck | null>}
   */
  async findById(id) {
    const tasckId = id.getValue();
    const tascksFound = await client.findOne({ where: { id: tasckId }, raw: true });
    if (!tascksFound) return null;
    const tasck = Tasck.create(ID.create(tascksFound.id), ID.create(tascksFound.name), Done.create(tascksFound.done));
    return tasck;
  }
}


