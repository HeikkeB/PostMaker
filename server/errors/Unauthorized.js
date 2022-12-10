export default class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.errorMessage = message;
    this.statusCode = 401;
  }
}
