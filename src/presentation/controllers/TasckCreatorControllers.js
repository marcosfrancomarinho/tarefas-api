// @ts-check
import { TasckCreatorHandler } from '../../application/usecase/TasckCreatorHandler.js';

export class TasckCreatorControllers {
  #tasckCreatorHandler;
  /**
   * @param {TasckCreatorHandler} tasckCreatorHandler
   */
  constructor(tasckCreatorHandler) {
    this.#tasckCreatorHandler = tasckCreatorHandler;
  }



  /**
   * @param {import('express').Request} request
   * @param {import('express').Response} response
   * @param {import('express').NextFunction} next
   */
  async execute(request, response, next) {
    try {
      const { name, done } = request.body;
      const { tasckId } = await this.#tasckCreatorHandler.create({ name, done });
      response.status(200).json({ tasckId, msg: 'tasck create success' });
    } catch (error) {
        console.log(error)
      next(error);
    }
  }
}
