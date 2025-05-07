//@ts-check
import { Tasck } from '../../domain/entities/Tasck.js';
import { Done } from '../../domain/valuesobject/Done.js';
import { Name } from '../../domain/valuesobject/Name.js';
import { UUID } from '../../infrastructure/genereteId/UUID.js';
import { SequelizeTasckCreator } from '../../infrastructure/repository/SequelizeTasckCreator.js';

export class TasckCreatorHandler {
  #generatorId;
  #tasckCreator;
  /**
   * @param {SequelizeTasckCreator} tasckCreator
   * @param {UUID} generatorId
   */
  constructor(tasckCreator, generatorId) {
    this.#tasckCreator = tasckCreator;
    this.#generatorId = generatorId;
  }

  /**
   * @param {{name:string, done:boolean}} input
   * @returns { Promise<{ tasckId: string}>}
   */
  async create(input) {
    const id = this.#generatorId.generete();
    const name = Name.create(input.name);
    const done = Done.create(input.done);
    const tasck = Tasck.create(id, name, done);

    const tasckId = await this.#tasckCreator.create(tasck);
    const generatedId = { tasckId: tasckId.getValue() };
    return generatedId;
  }
}
