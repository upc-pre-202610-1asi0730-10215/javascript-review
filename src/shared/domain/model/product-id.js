import {generateUuid, validateUuid} from "./uuid.js";
import {ValidationError} from "./errors.js";

/**
 * Represents a product identifier value object.
 * @remarks
 * This class is used to represent a product identifier. It is immutable and should be used as a value object in the domain model.
 */
export class ProductId {
    #value;

    /**
     * Creates a new ProductId instance.
     * @throws {ValidationError} If the provided value is not a valid UUID.
     * @param value {string} - The product identifier value.
     */
    constructor(value) {
        if (!validateUuid(value))
            throw new ValidationError(`Invalid product ID: ${value}. Product IDs must be valid UUIDs.`);
        this.#value = value;
    }

    /**
     * Generates a new ProductId instance.
     * @returns {ProductId} A new ProductId instance.
     */
    static generate() {
        return new ProductId(generateUuid());
    }

    /**
     * Gets the value of the product identifier.
     * @returns {string} The product identifier value.
     */
    get value() {
        return this.#value;
    }

    /**
     * Checks if this ProductId is equal to another ProductId.
     * @param other {ProductId} - The other ProductId to compare with.
     * @returns {boolean}   True if the two ProductIds are equal, false otherwise.
     */
    equals(other) {
        return other instanceof ProductId && this.#value === other.value;
    }

    /**
     * Converts the ProductId to a string representation.
     * @returns {string} The product identifier value.
     */
    toString() {
        return this.#value;
    }
}