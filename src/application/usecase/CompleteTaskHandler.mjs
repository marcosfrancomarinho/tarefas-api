import { Done } from '../../domain/valuesobject/Done.mjs';
import { ID } from '../../domain/valuesobject/ID.mjs';
import { SequelizeCompleteTask } from '../../infrastructure/repository/SequelizeCompleteTask.mjs';
import { CompleteTaskRequestDTO } from '../dto/CompleteTaskRequestDTO.mjs';
import { CompleteTaskResponseDTO } from '../dto/CompleteTaskResponseDTO.mjs';

//@ts-check
export class CompleteTaskHandler {
  #completeTask;

  /** @param {SequelizeCompleteTask} completeTask */
  constructor(completeTask) {
    this.#completeTask = completeTask;
  }

  /**
   * @param {CompleteTaskRequestDTO} input
   * @returns {Promise<CompleteTaskResponseDTO>}
   */
  async markAsDone(input) {
    const taskId = ID.create(input.id);
    const doneStatus = Done.create(input.done);

    const updatedTaskId = await this.#completeTask.markAsDone(taskId, doneStatus);
    if (!updatedTaskId) throw new Error('Task not found or not updated.');

    const completedTaskResponse = new CompleteTaskResponseDTO(updatedTaskId.getValue());
    return completedTaskResponse;
  }
}
