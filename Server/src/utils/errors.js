export class ValidationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}

export class EstimationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "EstimationError";
    this.details = details;
  }
}
