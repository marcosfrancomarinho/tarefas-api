//@ts-check
import { Container } from '../../shared/container/Container.js';
export class Routers {
  /**
   * @param {import('express').Express} app
   */
  static start(app) {
    const { tasckCreatorControllers } = Container.dependences();

    app.post('/tasck', tasckCreatorControllers.execute.bind(tasckCreatorControllers));
  }
}
