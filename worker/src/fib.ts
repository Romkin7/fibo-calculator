/**
 * function "fib"
 * Is used to calculate the Fibonacci number at the given index.
 * @param {number} index
 * @returns {number}
 */
export default function fib(index: number): number {
    if (index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}
