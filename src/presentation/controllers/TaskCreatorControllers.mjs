// @ts-check
import { CreateTaskRequestDTO } from '../../application/dto/CreateTaskRequestDTO.mjs';
import { TaskCreatorHandler } from '../../application/usecase/TaskCreatorHandler.mjs';

export class TaskCreatorControllers {
  #taskCreatorHandler;
  /** @param {TaskCreatorHandler} taskCreatorHandler*/
  constructor(taskCreatorHandler) {
    this.#taskCreatorHandler = taskCreatorHandler;
  }

  
  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @param {import('express').NextFunction} next
   */
  async execute(request, response, next) {
    try {
      const { name, done } = request.body;
      const requestDTO = new CreateTaskRequestDTO(name, done);
      const taskCreated = await this.#taskCreatorHandler.create(requestDTO);
      response.status(200).json({ taskId: taskCreated.idTask, msg: 'task create success' });
    } catch (error) {
      next(error);
    }
  }
}
