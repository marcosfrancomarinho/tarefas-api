//@ts-check
import { TasckCreatorHandler } from '../../application/usecase/TasckCreatorHandler.js';
import { UUID } from '../../infrastructure/genereteId/UUID.js';
import { SequelizeTasckCreator } from '../../infrastructure/repository/SequelizeTasckCreator.js';
import { TasckCreatorControllers } from '../../presentation/controllers/TasckCreatorControllers.js';

export class Container {
  static dependences() {
    const uuid = new UUID();
    const tasckCreatorRespository = new SequelizeTasckCreator();
    const tasckCreatorHandler = new TasckCreatorHandler(tasckCreatorRespository, uuid);
    const tasckCreatorControllers = new TasckCreatorControllers(tasckCreatorHandler);

    return { tasckCreatorControllers };
  }
}
