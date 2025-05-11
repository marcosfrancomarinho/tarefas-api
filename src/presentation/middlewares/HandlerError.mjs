//@ts-check

export class HandlerError {
  /**
   * @param {any} error
   * @param {import("express").Request} request
   * @param {import("express").Response} response
   * @param {import("express").NextFunction} next
   */
  static catch(error, request, response, next) {
    console.log(error)
    response.status(400).json({ error: error });
  }
}
