import {ValidationError} from "../../../shared/domain/model/errors.js";
import {ProductId} from "../../../shared/domain/model/product-id.js";
import {Money} from "../../../shared/domain/model/money.js";

/**
 * Represents an item in a purchase order.
 * @remarks
 * This entity is used to represent an item in a purchase order.
 * It includes validation logic to ensure that the item's properties are valid.
 * The item has an order ID, product ID, quantity, and unit price.
 */

export class PurchaseOrderItem {
    #orderId;
    #productId;
    #quantity;
    #unitPrice;

    /**
     * Creates a new PurchaseOrderItem instance.
     * @param {Object} options - The options for creating the PurchaseOrderItem instance.
     * @param {string} options.orderId - The ID of the order that the item belongs to.
     * @param {ProductId} options.productId - The ID of the product being purchased.
     * @param {number} options.quantity - The quantity of the product being purchased.
     * @param {Money} options.unitPrice - The unit price of the product being purchased.
     * @throws {ValidationError} If any of the provided options are invalid.
     */
    constructor({ orderId, productId, quantity, unitPrice}) {
        if (!orderId || typeof orderId !== 'string')
            throw new ValidationError('Order ID is required and must be a non-empty string');
        if (!(productId instanceof ProductId))
            throw new ValidationError('Product ID must be a valid ProductId object');
        if (!(Number.isInteger(quantity) && quantity > 0 && quantity <= 1000))
            throw new ValidationError('Quantity must be a positive integer between 1 and 1000');
        if (!(unitPrice instanceof Money))
            throw new ValidationError('Unit price must be a valid Money object');
        this.#orderId = orderId;
        this.#productId = productId;
        this.#quantity = quantity;
        this.#unitPrice = unitPrice;
    }

    /**
     * Gets the ID of the order that the item belongs to.
     * @returns {string} The ID of the order.
     */
    get orderId() {
        return this.#orderId;
    }

    /**
     * Calculates the total price of the item.
     * @returns {Money} The total price of the item, calculated as unit price multiplied by quantity.
     */
    calculateItemTotal() {
        return this.#unitPrice.multiply(this.#quantity);
    }
}