import {ValidationError} from "./errors.js";
import {Currency} from "./currency.js";

/**
 * Represents a monetary value object.
 * @remarks
 * This class is used to represent a monetary value with a specific amount and currency.
 * It provides methods for adding and multiplying money values.
 */
export class Money {
    #amount;
    #currency;

    /**
     * Creates a new Money instance.
     * @param {Object} options - The options for creating the Money instance.
     * @param {number} options.amount - The amount of money.
     * @param {Currency} options.currency - The currency of the money.
     * @throws {ValidationError} If the provided amount or currency are invalid.
     */
    constructor({ amount, currency }) {
        if (!Number.isFinite(amount) || amount <= 0)
            throw new ValidationError("Amount must be a positive number");
        if (!(currency instanceof Currency))
            throw new ValidationError("Currency must be an instance of Currency");
        this.#amount = Number(amount.toFixed(2)); // Round to 2 decimal places
        this.#currency = currency;
    }

    /**
     * Gets the amount of money.
     * @returns {number} The amount of money.
     */
    get amount() {
        return this.#amount;
    }

    /**
     * Gets the currency of the money.
     * @returns {Currency} The currency of the money.
     */
    get currency() {
        return this.#currency;
    }

    /**
     * Checks if this Money instance is equal to another Money instance.
     * @param other {Money} - The other Money instance to compare with.
     * @returns {boolean}   True if the other instance is a Money and has the same amount and currency, false otherwise.
     */
    equals(other) {
        return other instanceof Money
            && this.#amount === other.amount
            && this.#currency.equals(other.currency);
    }

    /**
     * Adds another Money instance to this one, returning a new Money instance with the combined amount.
     * @param other {Money} - The other Money instance to add.
     * @returns {Money} A new Money instance with the combined amount and the same currency.
     */
    add(other) {
        if (!other instanceof Money)
            throw new ValidationError("Other must be an instance of Money");
        if (!this.currency.equals(other.currency))
            throw new ValidationError("Currencies must match");
        return new Money({ amount: this.amount + other.amount, currency: this.currency });
    }

    /**
     * Multiplies this Money instance by a factor, returning a new Money instance with the multiplied amount.
     * @param factor    {number} - The factor to multiply the amount by.
     * @returns {Money} A new Money instance with the multiplied amount and the same currency.
     */
    multiply(factor) {
        if (!Number.isFinite(factor) || factor <= 0)
            throw new ValidationError("Factor must be a positive number");
        return new Money({ amount: this.amount * factor, currency: this.currency });
    }

}