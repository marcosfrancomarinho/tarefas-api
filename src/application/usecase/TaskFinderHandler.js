//@ts-check
import { SequelizeTaskFinder } from '../../infrastructure/repository/SequelizeTaskFinder.js';

export class TaskFinderHandler {
  #sequelizeTaskFinder;

  /**
   * @param {SequelizeTaskFinder} sequelizeTaskFinder
   */
  constructor(sequelizeTaskFinder) {
    this.#sequelizeTaskFinder = sequelizeTaskFinder;
  }

  /**
   * @returns {Promise<{ id: string; name: string; done: boolean;}[]>}
   */
  async findAll() {
    const taskList = await this.#sequelizeTaskFinder.findAll();
    const tasks = taskList.map((task) => task.toPersistence());
    return tasks;
  }
}
