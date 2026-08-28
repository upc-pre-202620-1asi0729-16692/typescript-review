import {Money} from "../../../shared/domain/model/money.js";
import {CustomerId} from "./customer-id.js";

/**
 * Represents a customer aggregate with a unique ID, name, and last order price.
 *
 * @remarks
 * This class encapsulates the properties and behaviors of a customer in the CRM bounded context.
 * It ensures that the customer's name is not empty and allows tracking of the last order price.
 * The unique ID is represented by a CustomerId value object to ensure global uniqueness.
 *
 * @example
 * ```typescript
 * const customer = new Customer ('John Doe');
 * console.log(customer.id.id); // Outputs: a unique UUID
 * console.log(customer.name); // Outputs: John Doe
 * customer.lastOrderPrice = new Money(150, new Currency('USD'));
 * console.log(customer.lastOrderPrice?.toString()); // Outputs: USD 150.00
 * ```
 */
export class Customer {
    readonly #id: CustomerId;
    readonly #name: string;
    #lastOrderPrice: Money | null;

    /**
     * Creates a new Customer instance.
     * @remarks
     * The constructor generates a new CustomerId for the customer and validates that the name is not empty.
     * The last order price is initialized to null and can be set later.
     * @throws Error - If the name is empty or consists only of whitespace.
     * @param name - The name of the customer.
     */
    constructor(name: string) {
        if (!name || name.trim() === '')
            throw new Error(`Customer name cannot be empty: ${name}`);
        
        this.#id = new CustomerId();
        this.#name = name;
        this.#lastOrderPrice = null;
    }

    /**
     * Gets the unique ID of the customer.
     * @return The unique ID as a {@link CustomerId} object.
     */
    public get id(): CustomerId { return this.#id; }

    /**
     * Gets the name of the customer.
     * @return The name of the customer.
     */
    public get name(): string { return this.#name; }

    /**
     * Gets the last order price of the customer.
     * @return The last order price as a {@link Money} object, or null if not set.
     */
    public get lastOrderPrice(): Money | null { return this.#lastOrderPrice; }

    /**
     * Sets the last order price of the customer.
     * @param newLastOrderPrice - The new last order price as a {@link Money} object.
     */
    public set lastOrderPrice(newLastOrderPrice: Money) {
        this.#lastOrderPrice = newLastOrderPrice;
    }
}