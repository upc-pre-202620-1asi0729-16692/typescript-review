import {ProductId} from "./product-id.js";
import {SalesOrderId} from "./sales-order-id.js";
import {Money} from "../../../shared/domain/model/money.js";
import {generateUUID} from "../../../shared/domain/model/uuid.js";

/**
 * SalesOrderItem Entity represents an item in a sales order aggregate within the Sales bounded-context.
 * @remarks
 * The item ID is generated using a UUID utility to ensure uniqueness.
 * It encapsulates data such as the order ID, item ID, product ID, quantity, and unit price.
 * It also provides a method to calculate the total price for the item based on quantity and unit price.
 * @example
 * ```typescript
 * const productId = new ProductId();
 * const unitPrice = new Money(50, new Currency('USD'));
 * const salesOrderItem = new SalesOrderItem(new SalesOrderId(), productId, 2, unitPrice);
 * console.log(salesOrderItem.itemId); // Outputs: a unique UUID
 * console.log(salesOrderItem.calculateItemTotal().toString()); // Outputs: USD 100.00
 * ```
 */
export class SalesOrderItem {
    readonly #orderId: SalesOrderId;
    readonly #itemId: string;
    readonly #productId: ProductId;
    readonly #quantity: number;
    readonly #unitPrice: Money;

    /**
     * Creates a new SalesOrderItem instance.
     * @remarks
     * The constructor generates a unique UUID item ID for the sales order item and validates that the quantity is greater than zero.
     * @throws Error - If the quantity is less than or equal to zero.
     * @param orderId - The ID of the sales order to which this item belongs.
     * @param productId - The ID of the product being ordered.
     * @param quantity - The quantity of the product being ordered (must be greater than zero).
     * @param unitPrice - The unit price of the product.
     */
    constructor(orderId: SalesOrderId, productId: ProductId, quantity: number, unitPrice: Money) {
        if (quantity <= 0) throw new Error(`Quantity must be greater than zero: ${quantity}`);
        this.#orderId = orderId;
        this.#itemId = generateUUID();
        this.#productId = productId;
        this.#quantity = quantity;
        this.#unitPrice = unitPrice;
    }

    /**
     * Gets the ID of the sales order to which this item belongs.
     * @return The sales order ID as a {@link SalesOrderId} object.
     */
    public get orderId(): SalesOrderId { return this.#orderId; }

    /**
     * Gets the unique ID of the sales order item.
     * @return The unique item ID as a string.
     */
    public get itemId(): string { return this.#itemId; }

    /**
     * Gets the ID of the product being ordered.
     * @return The product ID as a {@link ProductId} object.
     */
    public get productId(): ProductId { return this.#productId; }

    /**
     * Gets the quantity of the product being ordered.
     * @return The quantity as a number.
     */
    public get quantity(): number { return this.#quantity; }

    /**
     * Gets the unit price of the product.
     * @return The unit price as a {@link Money} object.
     */
    public get unitPrice(): Money { return this.#unitPrice; }

    /**
     * Calculates the total price for this sales order item based on quantity and unit price.
     */
    public calculateItemTotal(): Money {
        return this.#unitPrice.multiply(this.#quantity);
    }
}