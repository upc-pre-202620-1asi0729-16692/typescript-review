import {generateUUID, validateUUID} from "../../../shared/domain/model/uuid.js";

/**
 * SalesOrderId Value Object represents a unique identifier for a sales order in the Sales bounded context.
 * It encapsulates the ID value and provides methods to access it.
 * @remarks
 * The ID is generated using a UUID utility to ensure uniqueness.
 * @example
 * ```typescript
 * const salesOrderId = new SalesOrderId();
 * console.log(salesOrderId.id); // Outputs: a unique UUID
 * ```
 */
export class SalesOrderId {
    readonly #id: string;

    /**
     * Creates a new SalesOrderId instance.
     * @remarks
     * The constructor generates a unique UUID ID for the sales order.
     * @param id - The unique identifier for the sales order. If not provided, a new UUID will be generated.
     * @throws Error - If the provided ID is not a valid UUID.
     */
    constructor(id?: string) {
        if (id && !validateUUID(id)) {
            throw new Error('Invalid UUID format');
        }
        this.#id = id ?? generateUUID();
    }

    /**
     * Gets the unique ID of the sales order.
     * @return The unique ID as a string.
     */
    public get id(): string { return this.#id; }
}
