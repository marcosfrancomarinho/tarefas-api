//@ts-check
import { Task } from '../../domain/entities/Task.js';
import { Done } from '../../domain/valuesobject/Done.js';
import { Name } from '../../domain/valuesobject/Name.js';
import { UUID } from '../../infrastructure/genereteId/UUID.js';
import { SequelizeTaskCreator } from '../../infrastructure/repository/SequelizeTaskCreator.js';

export class TaskCreatorHandler {
  #generatorId;
  #taskCreator;
  /**
   * @param {SequelizeTaskCreator} taskCreator
   * @param {UUID} generatorId
   */
  constructor(taskCreator, generatorId) {
    this.#taskCreator = taskCreator;
    this.#generatorId = generatorId;
  }

  /**
   * @param {{name:string, done:boolean}} input
   * @returns { Promise<{ taskId: string}>}
   */
  async create(input) {
    const id = this.#generatorId.generete();
    const name = Name.create(input.name);
    const done = Done.create(input.done);
    const task = Task.create(id, name, done);

    const taskId = await this.#taskCreator.create(task);
    const generatedId = { taskId: taskId.getValue() };
    return generatedId;
  }
}
