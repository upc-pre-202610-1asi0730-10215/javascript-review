import {ValidationError} from "../../../shared/domain/model/errors.js";

/**
 * Represents the state of a purchase order.
 * @remarks
 * This value object is used to represent the state of a purchase order. It provides methods to transition between states.
 * The valid states are: Draft, Submitted, Approved, Shipped, Completed, and Canceled.
 * The state transitions are:
 * - Draft -> Submitted -> Approved -> Shipped -> Completed -> Canceled
 */
export class PurchaseOrderState {
    /** @private */
    static #VALID_STATES = {
        DRAFT:      'Draft',
        SUBMITTED:  'Submitted',
        APPROVED:   'Approved',
        SHIPPED:    'Shipped',
        COMPLETED:  'Completed',
        CANCELED:  'Canceled'
    }
    #value;

    /**
     * Creates a new PurchaseOrderState instance.
     * @param {string} [value=PurchaseOrderState.#VALID_STATES.DRAFT] - The initial state of the purchase order.
     * @throws {ValidationError} If the provided state is not a valid state.
     */
    constructor(value = PurchaseOrderState.#VALID_STATES.DRAFT) {
        this.#validateState(value);
        this.#value = value;
    }

    /** @private */
    #validateState(state) {
        if (!Object.values(PurchaseOrderState.#VALID_STATES).includes(state))
            throw new ValidationError(`Invalid order state: ${state}. Valid states are: ${Object.values(PurchaseOrderState.#VALID_STATES).join(', ')}`);
    }

    /**
     * Transitions the state of the purchase order to 'Submitted'.
     * @param {PurchaseOrderState} currentState - The current state of the purchase order.
     * @returns {PurchaseOrderState} The new state of the purchase order.
     * @throws {ValidationError} If the current state is not Draft.
     */
    toSubmittedFrom(currentState) {
        if (currentState.value !== PurchaseOrderState.#VALID_STATES.DRAFT)
            throw new ValidationError(`Cannot submit an order in state ${currentState.value}. Only draft orders can be submitted.`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SUBMITTED);
    }

    /**
     * Transitions the state of the purchase order to 'Approved'.
     * @param {PurchaseOrderState} currentState - The current state of the purchase order.
     * @returns {PurchaseOrderState} The new state of the purchase order.
     * @throws {ValidationError} If the current state is not Submitted.
     */
    toApprovedFrom(currentState) {
        if (currentState.value !== PurchaseOrderState.#VALID_STATES.SUBMITTED)
            throw new ValidationError(`Cannot approve an order in state ${currentState.value}. Only submitted orders can be approved.`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.APPROVED);
    }

    /**
     * Transitions the state of the purchase order to 'Shipped'.
     * @param {PurchaseOrderState} currentState - The current state of the purchase order.
     * @returns {PurchaseOrderState} The new state of the purchase order.
     * @throws {ValidationError} If the current state is not Approved.
     */
    toShippedFrom(currentState) {
        if (currentState.value !== PurchaseOrderState.#VALID_STATES.APPROVED)
            throw new ValidationError(`Cannot ship an order in state ${currentState.value}. Only approved orders can be shipped.`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SHIPPED);
    }

    /**
     * Transitions the state of the purchase order to 'Completed'.
     * @param {PurchaseOrderState} currentState - The current state of the purchase order.
     * @returns {PurchaseOrderState} The new state of the purchase order.
     * @throws {ValidationError} If the current state is not Shipped.
     */
    toCompletedFrom(currentState) {
        if (currentState.value !== PurchaseOrderState.#VALID_STATES.SHIPPED)
            throw new ValidationError(`Cannot complete an order in state ${currentState.value}. Only shipped orders can be completed.`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.COMPLETED);
    }

    /**
     * Transitions the state of the purchase order to 'Canceled'.
     * @param {PurchaseOrderState} currentState - The current state of the purchase order.
     * @returns {PurchaseOrderState} The new state of the purchase order.
     * @throws {ValidationError} If the current state is not Draft or Submitted.
     */
    toCanceledFrom(currentState) {
        if (currentState.value !== PurchaseOrderState.#VALID_STATES.DRAFT
            && currentState.value !== PurchaseOrderState.#VALID_STATES.SUBMITTED)
            throw new ValidationError(`Cannot cancel an order in state ${currentState.value}. Only draft and submitted orders can be cancelled.`);
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.CANCELED);
    }

    /**
     * Gets the value of the purchase order state.
     * @returns {string} The value of the purchase order state.
     */
    get value() {
        return this.#value;
    }

    /**
     * Checks if the purchase order state is 'Draft'.
     * @returns {boolean} True if the purchase order state is 'Draft', false otherwise.
     */
    isDraft() {
        return this.#value === PurchaseOrderState.#VALID_STATES.DRAFT;
    }

    /**
     * Checks if the purchase order state is 'Submitted'.
     * @returns {boolean} True if the purchase order state is 'Submitted', false otherwise.
     */
    isSubmitted() {
        return this.#value === PurchaseOrderState.#VALID_STATES.SUBMITTED;
    }

    /**
     * Checks if the purchase order state is 'Approved'.
     * @returns {boolean} True if the purchase order state is 'Approved', false otherwise.
     */
    isApproved() {
        return this.#value === PurchaseOrderState.#VALID_STATES.APPROVED;
    }

    /**
     * Checks if the purchase order state is 'Shipped'.
     * @returns {boolean} True if the purchase order state is 'Shipped', false otherwise.
     */
    isShipped() {
        return this.#value === PurchaseOrderState.#VALID_STATES.SHIPPED;
    }

    /**
     * Checks if the purchase order state is 'Completed'.
     * @returns {boolean} True if the purchase order state is 'Completed', false otherwise.
     */
    isCompleted() {
        return this.#value === PurchaseOrderState.#VALID_STATES.COMPLETED;
    }

    /**
     * Checks if the purchase order state is 'Canceled'.
     * @returns {boolean} True if the purchase order state is 'Canceled', false otherwise.
     */
    isCanceled() {
        return this.#value === PurchaseOrderState.#VALID_STATES.CANCELED;
    }

    /**
     * Checks if the purchase order state is equal to another state.
     * @param {PurchaseOrderState} other - The other state to compare with.
     * @returns {boolean} True if the states are equal, false otherwise.
     */
    equals(other) {
        return other instanceof PurchaseOrderState && this.#value === other.value;
    }

}