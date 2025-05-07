//@ts-check

export class Done {
  #done;
  /**
   * @param {boolean} done
   */
  constructor(done) {
    this.#done = done;
  }

  getValue() {
    return this.#done;
  }
  /**
   *
   * @param {boolean} done
   * @returns {Done}
   */
  static create(done = false) {
    this.#validate(done);
    return new Done(done);
  }

  static #validate(done) {
    const checked = typeof done !== 'boolean' && typeof done !== 'number';
    if (checked) {
      throw new Error('Invalid value: "done" must be a boolean.');
    }
  }
}
