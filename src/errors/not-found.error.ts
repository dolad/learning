import BaseError from './base.error';

export class NotFoundError extends BaseError {
  message: string;
  name: string;

  constructor(entity: string) {
    const message = `${entity} not found`;
    const properties = {
      status: 404,
      code: 'entity_not_found',
    };
    super(message, properties);
    this.message = message;
    this.name = this.constructor.name;
  }
}
