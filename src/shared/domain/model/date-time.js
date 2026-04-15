import {ValidationError} from "./errors.js";

/**
 * Represents a date and time value object.
 * @remarks
 * This class is used to represent a date and time value. It provides methods for formatting and comparing date and time values.
 * It is immutable and should be used as a value object in the domain model.
 * @example
 * const dateTime = new DateTime('2024-06-01T12:00:00Z');
 * console.log(dateTime.toISOString()); // '2024-06-01T12:00:00.000Z'
 * console.log(dateTime.toString()); // '06/01/2024, 12:00 PM'
 * const anotherDateTime = new DateTime('2024-06-01T12:00:00Z');
 * console.log(dateTime.equals(anotherDateTime)); // true
 * const differentDateTime = new DateTime('2024-06-01T13:00:00Z');
 * console.log(dateTime.equals(differentDateTime)); // false
 */
export class DateTime {
    #date;

    /**
     * Creates a new DateTime instance.
     * @throws {ValidationError} If the provided date is invalid.
     * @param [date = new Date()] {Date | string }  - A date string or a Date object. If not provided, the current date and time will be used.
     */
    constructor(date = new Date()) {
        const parsedDate = date instanceof Date ? date : new Date(date);
        if (isNaN(parsedDate.getTime()))
            throw new ValidationError(`Invalid date: ${date}`);
        this.#date = date;
    }

    /**
     * Gets the date value.
     * @returns {Date} The date value.
     */
    get date() {
        return this.#date;
    }

    /**
     * Formats the date as an ISO string.
     * @returns {string} The date formatted as an ISO string.
     */
    toISOString() {
        return this.#date.toISOString();
    }

    /**
     * Formats the date as a human-readable string.
     * @returns {string}    The date formatted as a human-readable string.
     */
    toString() {
        let options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        return this.#date.toLocaleDateString('en-US', options);
    }

    /**
     * Compares this DateTime instance with another for equality.
     * @param other {DateTime} The other DateTime instance to compare with.
     * @returns {boolean}   True if the two DateTime instances represent the same date and time, false otherwise.
     */
    equals(other) {
        return other instanceof DateTime
            && this.#date.getTime() === other.date.getTime();
    }
}