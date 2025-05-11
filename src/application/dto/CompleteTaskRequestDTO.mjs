//@ts-check
export class CompleteTaskRequestDTO {
  id;
  done;
  /**
   * @param {string} id
   * @param {boolean} done
   */
  constructor(id, done) {
    this.id = id;
    this.done = done;
  }
}
