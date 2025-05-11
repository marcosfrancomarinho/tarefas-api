//@ts-check
import { CompleteTaskRequestDTO } from '../../application/dto/CompleteTaskRequestDTO.mjs';
import { CompleteTaskHandler } from '../../application/usecase/CompleteTaskHandler.mjs';

export class CompleteTaskControllers {
  #completeTaskHandler;
  /** @param {CompleteTaskHandler} completeTaskHandler */
  constructor(completeTaskHandler) {
    this.#completeTaskHandler = completeTaskHandler;
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @param {import('express').NextFunction} next
   */
  async execute(request, response, next) {
    try {
      const { id, done } = request.body;
      const requestDTO = new CompleteTaskRequestDTO(id, done);
      const updatedTaskId = await this.#completeTaskHandler.markAsDone(requestDTO);
      response.status(200).json({ id: updatedTaskId.id, msg: `task id: "${id}" update for (${done}).` });
    } catch (error) {
      next(error);
    }
  }
}
