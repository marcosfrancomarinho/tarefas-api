//@ts-check
import { TaskCreatorHandler } from '../../application/usecase/TaskCreatorHandler.js';
import { TaskFinderHandler } from '../../application/usecase/TaskFinderHandler.js';
import { UUID } from '../../infrastructure/genereteId/UUID.js';
import { SequelizeTaskCreator } from '../../infrastructure/repository/SequelizeTaskCreator.js';
import { SequelizeTaskFinder } from '../../infrastructure/repository/SequelizeTaskFinder.js';
import { TaskCreatorControllers } from '../../presentation/controllers/TaskCreatorControllers.js';
import { TaskFinderControllers } from '../../presentation/controllers/TaskFinderControllers.js';

export class Container {
  static dependences() {
    const uuid = new UUID();

    const taskCreatorRespository = new SequelizeTaskCreator();
    const taskCreatorHandler = new TaskCreatorHandler(taskCreatorRespository, uuid);
    const taskCreatorControllers = new TaskCreatorControllers(taskCreatorHandler);

    const taskFinderRepository = new SequelizeTaskFinder();
    const taskFinderHandler = new TaskFinderHandler(taskFinderRepository);
    const taskFinderControllers = new TaskFinderControllers(taskFinderHandler);

    return { taskCreatorControllers, taskFinderControllers };
  }
}
