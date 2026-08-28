import {DateTime} from "../../../shared/domain/model/date-time.js";
import {SalesOrderItem} from "./sales-order-item.js";
import {Currency} from "../../../shared/domain/model/currency.js";
import {Money} from "../../../shared/domain/model/money.js";
import {ProductId} from "./product-id.js";
import {SalesOrderId} from "./sales-order-id.js";
import {generateUUID} from "../../../shared/domain/model/uuid.js";

/**
 * Represents the possible states of a SalesOrder.
 */
export type SalesOrderState = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'CANCELED';

/**
 * SalesOrder Aggregate represents a sales order within the Sales bounded-context.
 * @remarks
 * The sales order encapsulates data such as the customer ID, order ID, list of items, order date, and currency.
 * It ensures that the order is associated with a valid customer and contains at least one item.
 * The order date is represented using the DateTime value object to ensure valid date handling.
 * The currency is represented using the Currency value object to ensure valid currency handling.
 * @example
 * ```typescript
 * const customerId = 'customer123';
 * const items = [new SalesOrderItem(new SalesOrderId('order123'), new ProductId(), 2, new Money(50, new Currency('USD')))];
 * const salesOrder = new SalesOrder(customerId, new Currency('USD'));
 * console.log(salesOrder.id.id); // Outputs: a unique UUID
 * console.log(salesOrder.items.length); // Outputs: 1
 * console.log(salesOrder.orderedAt.toString()); // Outputs: current date in ISO 8601 format
 * console.log(salesOrder.currency.code); // Outputs: USD
 * ```
 */
export class SalesOrder {
    readonly #customerId: string;
    readonly #id: SalesOrderId;
    readonly #items: SalesOrderItem[];
    readonly #orderedAt: DateTime;
    readonly #currency: Currency;
    #state: SalesOrderState;

    /**
     * Creates a new SalesOrder instance.
     * @remarks
     * The constructor generates a unique UUID ID for the sales order and validates that the customer ID is provided.
     * The order date is initialized to the current date and time if not provided.
     * The order state is initialized to 'PENDING'.
     * @param customerId - The ID of the customer placing the order.
     * @param currency - The currency of the order.
     * @param orderedAt - The date and time when the order was placed (optional, defaults to current date and time).
     */
    constructor(customerId: string, currency: Currency, orderedAt?: Date | string) {
        if (!customerId || customerId.trim() === '')
            throw new Error('Customer ID cannot be empty');
        this.#customerId = customerId;
        this.#id = new SalesOrderId();
        this.#items = [];
        this.#orderedAt = new DateTime(orderedAt);
        this.#currency = currency;
        this.#state = 'PENDING';
    }

    /** Determines if items can be added to the order based on its current state.
     * @return True if items can be added, false otherwise.
     */
    private canAddItems(): boolean {
        return this.#state !== 'CANCELED' && this.#state !== 'SHIPPED';
    }

    /** Getters and Setters */
    public get customerId(): string { return this.#customerId; }

    public get id(): SalesOrderId { return this.#id; }

    public get items(): ReadonlyArray<SalesOrderItem> { return this.#items; }

    public get orderedAt(): DateTime { return this.#orderedAt; }

    public get currency(): Currency { return this.#currency; }

    public get state(): SalesOrderState { return this.#state; }

    /**
     * Adds an item to the sales order.
     * @remarks
     * Items can only be added if the order is in the 'PENDING' or 'CONFIRMED' state.
     * The method validates that the product ID is not empty, the quantity is greater than zero,
     * and the unit price is non-negative and in the correct currency.
     * @throws Error - If the order state does not allow adding items, or if any validation fails.
     * @param productId The ID of the product being added.
     * @param quantity The quantity of the product being added.
     * @param unitPrice The unit price of the product being added.
     */
    public addItem(productId: ProductId, quantity: number, unitPrice: Money): void {
        if (!this.canAddItems())
            throw new Error(`Cannot add items to an order that is ${this.#state}`);
        if (!productId || productId.id.trim() === '')
            throw new Error('Product ID cannot be empty');
        if (quantity <= 0)
            throw new Error('Quantity must be greater than zero');
        if (unitPrice.amount < 0)
            throw new Error('Unit price amount cannot be negative');
        if (unitPrice.currency.code !== this.#currency.code)
            throw new Error(`Currency mismatch: expected ${this.#currency.code}, but got ${unitPrice.currency.code}`);
        
        const item = new SalesOrderItem(this.#id, productId, quantity, unitPrice);
        this.#items.push(item);
    }

    /**
     * Calculates the total amount of the sales order by summing the total of each item.
     * @return The total amount as a {@link Money} object.
     */
    public calculateTotalAmount(): Money {
        return this.#items.reduce((total, item) =>
            total.add(item.calculateItemTotal()), new Money(0, this.#currency));
    }

    /**
     * Gets the formatted order date as a string.
     * @return The formatted order date.
     */
    public getFormattedOrderedAt(): string {
        return this.#orderedAt.format();
    }

    /**
     * Confirms the sales order, changing its state to 'CONFIRMED'.
     * @throws Error - If the order is not in the 'PENDING' state.
     */
    public confirm(): void {
        if (this.#state === "PENDING") this.#state = "CONFIRMED";
        else throw new Error(`Cannot confirm an order that is ${this.#state}`);
    }

    /**
     * Ships the sales order, changing its state to 'SHIPPED'.
     * @throws Error - If the order is not in the 'CONFIRMED' state.
     */
    public ship(): void {
        if (this.#state === "CONFIRMED") this.#state = "SHIPPED";
        else throw new Error(`Cannot ship an order that is ${this.#state}`);
    }

    /**
     * Cancels the sales order, changing its state to 'CANCELED'.
     * @throws Error - If the order is in the 'PENDING' or 'CANCELED' state.
     */
    public cancel(): void {
        if (this.#state === "PENDING" || this.#state === "CANCELED")
            throw new Error(`Cannot cancel an order that is ${this.#state}`);
        this.#state = "CANCELED";
    }
}