//@ts-check
import { Done } from '../valuesobject/Done.mjs';
import { ID } from '../valuesobject/ID.mjs';
import { Name } from '../valuesobject/Name.mjs';

export class Task {
  #id;
  #name;
  #done;

  /** @param {ID} id @param {Name} name @param {Done} done */
  constructor(id, name, done = Done.create()) {
    this.#id = id;
    this.#name = name;
    this.#done = done;
  }

  toPersistence() {
    return {
      id: this.#id.getValue(),
      name: this.#name.getValue(),
      done: this.#done.getValue(),
    };
  }

  /**
   * @param {ID} id @param {Name} name @param {Done} done
   * @returns {Task}
   */
  static create(id, name, done) {
    return new Task(id, name, done);
  }
}
