// @ts-check
import { TaskCreatorHandler } from '../../application/usecase/TaskCreatorHandler.js';

export class TaskCreatorControllers {
  #taskCreatorHandler;
  /**
   * @param {TaskCreatorHandler} taskCreatorHandler
   */
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
      const { taskId } = await this.#taskCreatorHandler.create({ name, done });
      response.status(200).json({ taskId, msg: 'task create success' });
    } catch (error) {
        console.log(error)
      next(error);
    }
  }
}
