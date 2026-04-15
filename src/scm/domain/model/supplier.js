import {SupplierId} from "../../../shared/domain/model/supplier-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";

/**
 * Represents a supplier aggregate root.
 * @remarks
 * This class is used to represent a supplier entity in the domain model.
 * It includes validation logic to ensure that the supplier's properties are valid, according to the business rules.
 * The supplier has an ID, name, contact email, and last order total price.
 * The contact email and last order total price are optional properties.
 */
export class Supplier {
    #id;
    #name;
    #contactEmail;
    #lastOrderTotalPrice;

    /**
     * Creates a new Supplier instance.
     * @param {Object} options - The options for creating the Supplier instance.
     * @param {SupplierId} options.id - The unique identifier of the supplier.
     * @param {string} options.name - The name of the supplier.
     * @param {string | null} [options.contactEmail] - The contact email of the supplier.
     * @param {Money} [options.lastOrderTotalPrice] - The total price of the last order of the supplier.
     * @throws {ValidationError} If the supplier ID, name, or contact email is invalid.
     */
    constructor({ id, name, contactEmail = null, lastOrderTotalPrice = null}) {
        if (!(id instanceof SupplierId))
            throw new ValidationError('Supplier ID must be a valid SupplierId object');
        if (typeof name !== 'string' || name.length < 2 || name.length > 100)
            throw new ValidationError('Supplier name must be a string between 2 and 100 characters');
        if (contactEmail !== null && !this.#isValidEmail(contactEmail))
            throw new ValidationError('Contact email must be a valid email address or null')
        if (lastOrderTotalPrice !== null && !(lastOrderTotalPrice instanceof Money))
            throw new ValidationError('Last order total price must be a Money object or null');
        this.#id = id;
        this.#name = name;
        this.#contactEmail = contactEmail;
        this.#lastOrderTotalPrice = lastOrderTotalPrice;
    }

    /**
     * @private
     * Validates if the given email is in a valid format.
     * @param {string} email - The email address to validate.
     * @returns {boolean}   True if the email is valid, false otherwise.
     */
    #isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Gets the supplier's ID.
     * @returns {SupplierId} The supplier's ID.
     */
    get id() {
        return this.#id;
    }

    /**
     * Gets the supplier's name.
     * @returns {string} The supplier's name.
     */
    get name() {
        return this.#name;
    }

    /**
     * Gets the supplier's contact email.
     * @returns {string | null} The supplier's contact email, or null if not provided.
     */
    get contactEmail() {
        return this.#contactEmail;
    }

    /**
     * Gets the total price of the supplier's last order.
     * @returns {Money | null} The total price of the supplier's last order, or null if not provided.
     */
    get lastOrderTotalPrice() {
        return this.#lastOrderTotalPrice;
    }
}