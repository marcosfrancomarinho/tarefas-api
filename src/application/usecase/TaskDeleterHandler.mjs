//@ts-check
import { ID } from '../../domain/valuesobject/ID.mjs';
import { SequelizeTaskDeleter } from '../../infrastructure/repository/SequelizeTaskDeleter.mjs';
import { DeleteTaskRequestDTO } from '../dto/DeleteTaskRequestDTO.mjs';
import { DeleteTaskResponseDTO } from '../dto/DeleteTaskResponseDTO.mjs';

export class TaskDeleterHandler {
  #tasckDeleterRepository;

  /** @param {SequelizeTaskDeleter} tasckDeleterRepository */
  constructor(tasckDeleterRepository) {
    this.#tasckDeleterRepository = tasckDeleterRepository;
  }

  /**
   * @param {DeleteTaskRequestDTO} input
   * @returns {Promise<DeleteTaskResponseDTO>}
   */
  async delete(input) {
    const id = ID.create(input.taskId);
    const taskId = await this.#tasckDeleterRepository.deleteById(id);

    if (!taskId) throw new Error('Id not found.');

    const deletedId = new DeleteTaskResponseDTO(taskId.getValue());
    return deletedId;
  }
}
