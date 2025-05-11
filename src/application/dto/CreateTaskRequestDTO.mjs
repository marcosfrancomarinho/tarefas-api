export class CreateTaskRequestDTO {
  name;
  done;
  /**
   * @param {string} name
   * @param {boolean} done
   */
  constructor(name, done) {
    this.name = name;
    this.done = done;
  }
}
