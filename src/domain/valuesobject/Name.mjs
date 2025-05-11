//@ts-check
export class Name {
  #name;
  /** @param {string} name */
  constructor(name) {
    this.#name = name;
  }

  getValue() {
    return this.#name;
  }
  /**
   * @param {string} name
   * @returns {Name}
   */
  static create(name) {
    this.#validate(name);
    return new Name(name.trim());
  }
  /** @param {string} name  */
  static #validate(name) {
    const isNotEmpty = /^(?!\s*$).+/;
    const checked = !name || !isNotEmpty.test(name) || typeof name !== 'string';
    if (checked) throw new Error('Invalid name');
  }
}
