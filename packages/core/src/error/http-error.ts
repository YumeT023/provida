/**
 * Clazz that represents an http error
 * TODO: inspect if a move to provida/error is needed
 */
export class HttpError extends Error {
  constructor(
    public readonly message: string,
    public readonly status: number,
    public readonly body: string | object | null = null
  ) {
    super(message);
    Object.setPrototypeOf(this, HttpError.prototype);
    this.name = this.constructor.name;
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}
