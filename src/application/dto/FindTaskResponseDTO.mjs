export class FindTaskResponseDTO {
  id;
  name;
  done;
  /**
   * @param {string} name
   * @param {boolean} done
   * @param {string} id
   */
  constructor(name, done, id) {
    this.name = name;
    this.done = done;
    this.id = id;
  }
}
