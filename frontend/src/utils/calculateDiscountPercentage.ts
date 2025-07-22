/**
 * Calculates the discount percentage based on final price and discount amount
 * @param finalPrice - The price after discount has been applied
 * @param discountAmount - The amount that was deducted
 * @returns The discount percentage rounded to nearest integer, or null if inputs are invalid
 */
export const calculateDiscountPercentage = (
  finalPrice: string | number,
  discountAmount: string | number
): number | null => {
  // Convert inputs to numbers if they're strings
  const final =
    typeof finalPrice === "string" ? parseFloat(finalPrice) : finalPrice;
  const discount =
    typeof discountAmount === "string"
      ? parseFloat(discountAmount)
      : discountAmount;

  // Validate inputs
  if (isNaN(final) || isNaN(discount) || final < 0 || discount <= 0) {
    return null;
  }

  // Calculate original price
  const originalPrice = final + discount;

  // Calculate discount percentage
  const percentage = (discount / originalPrice) * 100;

  // Round to nearest integer
  return Math.round(percentage);
};
