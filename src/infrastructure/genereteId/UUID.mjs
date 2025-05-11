//@ts-check
import { v4 as uuid } from 'uuid';
import { ID } from '../../domain/valuesobject/ID.mjs';

export class UUID {
  /** @returns {ID}*/
  generete() {
    const hash = uuid();
    const id = ID.create(hash);
    return id;
  }
}
