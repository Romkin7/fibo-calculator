/**
 * function "fib"
 * Is used to calculate the Fibonacci number at the given index.
 * @param {number} index
 * @returns {number}
 */
export default function fib(index: number): number {
    if (index < 2) {
        // If the index is less than 2, return 1
        return 1;
    } else {
        // Otherwise, return the sum of the previous two Fibonacci numbers
        return fib(index - 1) + fib(index - 2);
    }
}
