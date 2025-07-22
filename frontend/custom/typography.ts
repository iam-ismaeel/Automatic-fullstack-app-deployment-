const generateTypography = (
  fontSize: string,
  fontWeight: number,
  lineHeight: string,
  letterSpacing?: string
) => ({
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
});

const typography = {
  // *extra small
  ".text-extra-small-regular": generateTypography("12px", 400, "120%", "0%"),
  ".text-extra-small-medium": generateTypography("12px", 500, "120%", "0%"),
  ".text-extra-small-bold": generateTypography("12px", 700, "120%", "0%"),
  // *small
  ".text-small-regular": generateTypography("14px", 400, "120%", "0%"),
  ".text-small-medium": generateTypography("14px", 500, "22px", "0%"),
  ".text-small-bold": generateTypography("14px", 700, "120%", "0%"),
  // *base
  ".text-base-regular": generateTypography("16px", 400, "120%", "0%"),
  ".text-base-medium": generateTypography("16px", 500, "22px", "0%"),
  ".text-base-bold": generateTypography("16px", 700, "120%", "0%"),
  // *large
  ".text-large-regular": generateTypography("18px", 400, "120%", "0%"),
  ".text-large-medium": generateTypography("18px", 500, "auto", "0%"),
  ".text-large-bold": generateTypography("18px", 700, "120%", "0%"),
  // *extra large
  ".text-extra-large-regular": generateTypography("20px", 400, "120%", "0%"),
  ".text-extra-large-medium": generateTypography("20px", 500, "auto", "0%"),
  ".text-extra-large-bold": generateTypography("20px", 700, "120%", "0%"),
  // *heading 1
  ".text-heading-1-medium": generateTypography("36px", 500, "120%", "0%"),
  ".text-heading-1-bold": generateTypography("36px", 700, "120%", "0%"),
  // *heading 2
  ".text-heading-2-medium": generateTypography("32px", 500, "120%", "0%"),
  ".text-heading-2-bold": generateTypography("32px", 700, "120%", "0%"),
  // *heading 3
  ".text-heading-3-medium": generateTypography("28px", 500, "120%", "0%"),
  ".text-heading-3-bold": generateTypography("28px", 700, "120%", "0%"),
  // *heading 4
  ".text-heading-4-medium": generateTypography("25px", 500, "120%", "0%"),
  ".text-heading-4-bold": generateTypography("25px", 700, "120%", "0%"),
  // *heading 5
  ".text-heading-5-medium": generateTypography("22px", 500, "120%", "0%"),
  ".text-heading-5-bold": generateTypography("22px", 700, "120%", "0%"),

  // *Fheading
  ".text-h5": generateTypography("32px", 700, "120%", "0%"),
  ".text-h4": generateTypography("40px", 500, "120%", "0%"),
  ".text-h3": generateTypography("60px", 500, "120%", "0%"),
  ".text-h2": generateTypography("100px", 500, "120%", "0%"),
  ".text-h1": generateTypography("140px", 500, "120%", "0%"),
};

export default typography;
