//@ts-check
import { Container } from '../../shared/container/Container.js';
export class Routers {
  /**
   * @param {import('express').Express} app
   */
  static start(app) {
    const { taskCreatorControllers, taskFinderControllers } = Container.dependences();

    app.post('/create-task', taskCreatorControllers.execute.bind(taskCreatorControllers));
    app.get('/find-task-all', taskFinderControllers.execute.bind(taskFinderControllers));
  }
}
