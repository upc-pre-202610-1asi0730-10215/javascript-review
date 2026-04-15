import {generateUuid, validateUuid} from "./uuid.js";
import {ValidationError} from "./errors.js";

/**
 * Represents a supplier identifier value object.
 * @remarks
 * This class is used to represent a supplier identifier. It is immutable and should be used as a value object in the domain model.
 */
export class SupplierId {
    #value;

    /**
     * Creates a new SupplierId instance.
     * @throws {ValidationError} If the provided value is not a valid UUID.
     * @param value - The supplier ID value, which must be a valid UUID string.
     */
    constructor(value) {
        if (!validateUuid(value))
            throw new ValidationError(`Invalid supplier ID: ${value}. Supplier IDs must be valid UUIDs.`);
        this.#value = value;
    }

    /**
     * Generates a new SupplierId instance.
     * @returns {SupplierId} A new SupplierId instance.
     */
    static generate() {
        return new SupplierId(generateUuid());
    }

    /**
     * Gets the value of the supplier identifier.
     * @returns {string} A string containing the supplier identifier value.
     */
    get value() {
        return this.#value;
    }

    /**
     * Checks if this SupplierId is equal to another SupplierId.
     * @param other - The other SupplierId to compare with.
     * @returns {boolean}   True if the other SupplierId is equal to this one, false otherwise.
     */
    equals(other) {
        return other instanceof SupplierId && this.#value === other.value;
    }

    /**
     * Returns a string representation of the SupplierId.
     * @returns {string} A string containing the supplier identifier value.
     */
    toString() {
        return this.#value;
    }
}