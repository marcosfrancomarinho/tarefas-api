//@ts-check
import { SequelizeTaskFinder } from '../../infrastructure/repository/SequelizeTaskFinder.mjs';
import { FindTaskResponseDTO } from '../dto/FindTaskResponseDTO.mjs';

export class TaskFinderHandler {
  #sequelizeTaskFinder;

  /** @param {SequelizeTaskFinder} sequelizeTaskFinder*/
  constructor(sequelizeTaskFinder) {
    this.#sequelizeTaskFinder = sequelizeTaskFinder;
  }

  /** @returns {Promise<FindTaskResponseDTO[]>}*/
  async findAll() {
    const taskList = await this.#sequelizeTaskFinder.findAll();

    const tasks = taskList.map((task) => {
      const { done, id, name } = task.toPersistence();
      return new FindTaskResponseDTO(name, done, id);
    });
    
    return tasks;
  }
}
