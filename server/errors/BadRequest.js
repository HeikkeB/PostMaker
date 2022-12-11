export default class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 400;
  }
}
