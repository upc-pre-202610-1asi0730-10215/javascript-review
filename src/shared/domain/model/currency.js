import {ValidationError} from "./errors.js";

/**
 * Represents a currency value object.
 * @remarks
 * This class is used to represent a currency value with a specific code.
 */
export class Currency {
    static #VALID_CODES = ['USD', 'EUR', 'GBP', 'JPY'];
    #code;

    /**
     * Creates a new Currency instance.
     * @throws {ValidationError} If the provided code is not a valid currency code.
     * @param code {string} - The currency code.
     */
    constructor(code) {
        if (!Currency.#VALID_CODES.includes(code))
            throw new ValidationError(`Invalid currency code: ${code}. Valid codes are: ${Currency.#VALID_CODES.join(', ')}`);
        this.#code = code;
    }

    /**
     * Gets the currency code.
     * @returns {string} The currency code.
     */
    get code() {
        return this.#code;
    }

    /**
     * Checks if this Currency instance is equal to another Currency instance.
     * @param other {Currency} - The other Currency instance to compare with.
     * @returns {boolean}   True if the other instance is a Currency and has the same code, false otherwise.
     */
    equals(other) {
        return other instanceof Currency && this.#code === other.code;
    }
}