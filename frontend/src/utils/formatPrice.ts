/**
 * Formats a number as a price with commas, rounding up based on decimal places.
 * @param input - The number or string to format.
 * @returns The formatted price as a string with no decimal places.
 */
export const formatPrice = (input: number | string): string => {
  const amount = typeof input === "string" ? parseFloat(input) : input;

  if (isNaN(amount)) {
    return input as string;
  }

  // Round up using Math.ceil()
  const roundedAmount = Math.ceil(amount);

  // Format with commas but no decimal places
  return roundedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
