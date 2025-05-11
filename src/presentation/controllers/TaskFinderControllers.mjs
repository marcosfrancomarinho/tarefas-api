//@ts-check

import { TaskFinderHandler } from '../../application/usecase/TaskFinderHandler.mjs';

export class TaskFinderControllers {
  #taskFinderHandler;
  /** @param {TaskFinderHandler} taskFinderHandler */
  constructor(taskFinderHandler) {
    this.#taskFinderHandler = taskFinderHandler;
  }

  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @param {import('express').NextFunction} next
   */
  async execute(request, response, next) {
    try {
      const tasksFound = await this.#taskFinderHandler.findAll();
      response.status(200).json(tasksFound);
    } catch (error) {
      next(error);
    }
  }
}
