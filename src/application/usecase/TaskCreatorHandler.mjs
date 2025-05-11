//@ts-check
import { Task } from '../../domain/entities/Task.mjs';
import { Done } from '../../domain/valuesobject/Done.mjs';
import { Name } from '../../domain/valuesobject/Name.mjs';
import { UUID } from '../../infrastructure/genereteId/UUID.mjs';
import { SequelizeTaskCreator } from '../../infrastructure/repository/SequelizeTaskCreator.mjs';
import { CreateTaskRequestDTO } from '../dto/CreateTaskRequestDTO.mjs';
import { CreateTaskResponseDTO } from '../dto/CreateTaskResponseDTO.mjs';

export class TaskCreatorHandler {
  #generatorId;
  #taskCreator;
  /** @param {SequelizeTaskCreator} taskCreator,  @param {UUID} generatorId*/
  constructor(taskCreator, generatorId) {
    this.#taskCreator = taskCreator;
    this.#generatorId = generatorId;
  }

  /**
   * @param {CreateTaskRequestDTO} input
   * @returns { Promise<CreateTaskResponseDTO>}
   */
  async create(input) {
    const id = this.#generatorId.generete();
    const name = Name.create(input.name);
    const done = Done.create(input.done);
    const task = Task.create(id, name, done);

    const taskId = await this.#taskCreator.create(task);
    const generatedId = new CreateTaskResponseDTO(taskId.getValue());
    return generatedId;
  }
}
