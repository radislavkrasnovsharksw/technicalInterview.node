import { HttpError } from './httpError.error';

export class NotFoundError extends HttpError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);
  }
}
