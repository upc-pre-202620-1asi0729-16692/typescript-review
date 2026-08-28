import {generateUUID, validateUUID} from "../../../shared/domain/model/uuid.js";

/**
 * CustomerId Value Object represents a unique identifier for a customer in the CRM bounded context.
 * It encapsulates the ID value and provides methods to access it.
 * @remarks
 * The ID is generated using a UUID utility to ensure uniqueness.
 * @example
 * ```typescript
 * const customerId = new CustomerId();
 * console.log(customerId.id); // Outputs: a unique UUID
 * ```
 */
export class CustomerId {
    readonly #id: string;

    /**
     * Creates a new CustomerId instance.
     * @remarks
     * The constructor generates a unique UUID ID for the customer.
     * @param id - The unique identifier for the customer. If not provided, a new UUID will be generated.
     * @throws Error - If the provided ID is not a valid UUID.
     */
    constructor(id?: string) {
        if (id && !validateUUID(id)) {
            throw new Error('Invalid UUID format');
        }
        this.#id = id ?? generateUUID();
    }

    /**
     * Gets the unique ID of the customer.
     * @return The unique ID as a string.
     */
    public get id(): string { return this.#id; }
}
