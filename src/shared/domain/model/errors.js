/**
 * Represents an error related to validation.
 */
export class ValidationError extends Error {
    /**
     * Creates a new ValidationError instance.
     * @remarks
     * This constructor is used to create an instance of the ValidationError class.
     * It sets the name of the error to 'ValidationError' and initializes the base class with the provided message.
     * @param message   The error message describing the validation error.
     */
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}