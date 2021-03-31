import BaseError from './base.error';

export class InvalidCredential extends BaseError {
  constructor() {
    const message = `Invalid credential provided`;
    const properties = {
      status: 401,
      code: 'invalid_credential',
    };
    super(message, properties);
    this.message = message;
    this.name = this.constructor.name;
  }
}
