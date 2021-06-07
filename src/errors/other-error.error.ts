import BaseError from './base.error';

export class OtherErrors extends BaseError {
  message: string;
  name: string;

  constructor(entity: string, code: number) {
    const message = entity;
    const properties = {
      status: code,
      code: 'error',
    };
    super(message, properties);

    this.message = message;
    this.name = this.constructor.name;
  }
}
