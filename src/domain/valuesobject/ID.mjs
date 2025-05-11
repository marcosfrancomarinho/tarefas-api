//@ts-check
export class ID {
  #id;
  /** @param {string} id */
  constructor(id) {
    this.#id = id;
  }

  getValue() {
    return this.#id;
  }
  /**
   * @param {string} id
   * @returns {ID}
   */
  static create(id) {
    this.#validate(id);
    return new ID(id.trim());
  }

  /** @param {string} id  */
  static #validate(id) {
    const isNotEmpty = /^(?!\s*$).+/;
    const checked = !id || !isNotEmpty.test(id) || typeof id !== 'string';
    if (checked) throw new Error('Invalid ID');
  }
}
