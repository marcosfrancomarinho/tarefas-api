//@ts-check
import { DeleteTaskRequestDTO } from '../../application/dto/DeleteTaskRequestDTO.mjs';
import { TaskDeleterHandler } from '../../application/usecase/TaskDeleterHandler.mjs';

export class TaskDeleterControllers {
  #taskDeleterHandler;
  /** @param {TaskDeleterHandler} taskDeleterHandler */
  constructor(taskDeleterHandler) {
    this.#taskDeleterHandler = taskDeleterHandler;
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @param {import('express').NextFunction} next
   */
  async execute(request, response, next) {
    try {
      const { id } = request.params;
      const requestDTO = new DeleteTaskRequestDTO(id);
      const result = await this.#taskDeleterHandler.delete(requestDTO);
      response.status(200).json({ id: result.taskId, msg: 'id deleted with success;' });
    } catch (error) {
      next(error);
    }
  }
}
