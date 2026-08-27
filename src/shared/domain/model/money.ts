import {Currency} from "./currency.js";

/**
 * Value Object representing a monetary amount in a specific currency.
 *
 * @remarks
 * This class encapsulates a monetary amount and its associated currency.
 * It validates that the amount is non-negative upon instantiation and provides methods
 * to format the amount in a human-readable way according to the currency and locale.
 * @example
 * ```typescript
 * const usd = new Currency('USD');
 * const money = new Money(100, usd);
 * console.log(money.format()); // Outputs: $100.00 (in 'en-US' locale)
 * console.log(money.toString()); // Outputs: USD 100.00
 * ```
 */
export class Money {
    readonly #amount: number;
    readonly #currency: Currency;

    /**
     * Creates a new Money instance.
     * @param amount - The monetary amount (must be non-negative).
     * @param currency - The currency of the amount.
     * @throws {Error} If the amount is negative.
     */
    constructor(amount: number, currency: Currency) {
        if (amount < 0) throw Error(`Amount cannot be negative: ${amount}`);
        this.#amount = amount;
        this.#currency = currency;
    }

    /**
     * Gets the monetary amount.
     * @return The monetary amount.
     */
    public get amount(): number { return this.#amount; }

    /**
     * Gets the currency of the monetary amount.
     * @return The currency.
     */
    public get currency(): Currency { return this.#currency; }

    /**
     * Formats the monetary amount according to its currency and locale.
     * @param locale - The locale to use for formatting (default is 'en-US').
     * @return The formatted monetary string.
     */
    public format = (locale: string = 'en-US'): string => this.#currency.formatAmount(this.#amount, locale);

    /**
     * Returns the string representation of the monetary amount with its currency code.
     * @return The string representation in the format "CURRENCY_CODE AMOUNT".
     */
    public toString(): string {
        return `${this.#currency.code} ${this.#amount.toFixed(2)}`;
    }

    /**
     * Adds another Money instance to this one, ensuring both have the same currency.
     * @throws {Error} If the currencies do not match.
     * @return A new Money instance representing the sum of both amounts.
     * @param other - The other Money instance to add.
     */
    public add = (other: Money): Money => {
        if (this.#currency.code !== other.currency.code) {
            throw new Error(`Cannot add amounts with different currencies: ${this.#currency.code} and ${other.currency.code}`);
        }
        return new Money(this.#amount + other.amount, this.#currency);
    }

    /**
     * Multiplies the monetary amount by a non-negative factor.
     * @throws {Error} If the factor is negative.
     * @return A new Money instance representing the multiplied amount.
     * @param factor - The factor to multiply the amount by.
     */
    public multiply = (factor: number): Money => {
        if (factor < 0) throw Error(`Factor cannot be negative: ${factor}`);
        return new Money(this.#amount * factor, this.#currency);
    }
}