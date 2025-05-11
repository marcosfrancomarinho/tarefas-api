//@ts-check
import { Container } from '../../shared/container/Container.mjs';
export class Routers {
  /** @param {import('express').Express} app*/
  static start(app) {
    const { taskCreatorControllers, taskFinderControllers, tasckDeleterControllers, completeTaskControllers } =
      Container.dependences();

    app.post('/create-task', taskCreatorControllers.execute.bind(taskCreatorControllers));
    app.get('/find-task-all', taskFinderControllers.execute.bind(taskFinderControllers));
    app.delete('/delete-task/:id', tasckDeleterControllers.execute.bind(tasckDeleterControllers));
    app.put('/task-done', completeTaskControllers.execute.bind(completeTaskControllers));
  }
}
