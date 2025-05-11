//@ts-check
import { TaskCreatorHandler } from '../../application/usecase/TaskCreatorHandler.mjs';
import { TaskDeleterHandler } from '../../application/usecase/TaskDeleterHandler.mjs';
import { TaskFinderHandler } from '../../application/usecase/TaskFinderHandler.mjs';
import { UUID } from '../../infrastructure/genereteId/UUID.mjs';
import { SequelizeTaskCreator } from '../../infrastructure/repository/SequelizeTaskCreator.mjs';
import { SequelizeTaskDeleter } from '../../infrastructure/repository/SequelizeTaskDeleter.mjs';
import { SequelizeTaskFinder } from '../../infrastructure/repository/SequelizeTaskFinder.mjs';
import { TaskCreatorControllers } from '../../presentation/controllers/TaskCreatorControllers.mjs';
import { TaskDeleterControllers } from '../../presentation/controllers/TaskDeleterControllers.mjs';
import { TaskFinderControllers } from '../../presentation/controllers/TaskFinderControllers.mjs';

export class Container {
  static dependences() {
    const uuid = new UUID();

    const taskCreatorRespository = new SequelizeTaskCreator();
    const taskCreatorHandler = new TaskCreatorHandler(taskCreatorRespository, uuid);
    const taskCreatorControllers = new TaskCreatorControllers(taskCreatorHandler);

    const taskFinderRepository = new SequelizeTaskFinder();
    const taskFinderHandler = new TaskFinderHandler(taskFinderRepository);
    const taskFinderControllers = new TaskFinderControllers(taskFinderHandler);

    const tasckDeleterRepository = new SequelizeTaskDeleter();
    const taskDeleterHandler = new TaskDeleterHandler(tasckDeleterRepository);
    const tasckDeleterControllers = new TaskDeleterControllers(taskDeleterHandler);

    return { taskCreatorControllers, taskFinderControllers, tasckDeleterControllers };
  }
}
