export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }

  static fromErrors(errors: string[]): ValidationError {
    return new ValidationError(errors.join(' '));
  }
}