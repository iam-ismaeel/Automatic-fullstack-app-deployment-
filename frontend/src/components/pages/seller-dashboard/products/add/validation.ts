import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Product name is required")
    .max(31, "Product name cannot exceed 31 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(225, "Description cannot exceed 255 characters"),
  category: Yup.object().shape({
    category_id: Yup.string().required("Category is required"),
    sub_category_id: Yup.string(), // Optional if not always required
  }),
  // category_id: Yup.string().required("Category is required"),
  // sub_category_id: Yup.string(),
  brand_id: Yup.string(),
  color_id: Yup.string(),
  unit_id: Yup.string(),
  size_id: Yup.string(),
  product_sku: Yup.string(),
  discount_price: Yup.string().optional(),
  product_price: Yup.number()
    .typeError("Price must be a valid number")
    .positive("Price must be positive")
    .required("Price is required"),
  current_stock_quantity: Yup.number()
    .typeError("Stock quantity must be a valid number")
    .integer("Stock quantity must be an integer")
    .min(0, "Stock quantity cannot be negative")
    .required("Stock quantity is required"),
  minimum_order_quantity: Yup.number()
    .typeError("Minimum order quantity must be a valid number")
    .integer("Minimum order quantity must be an integer")
    .min(1, "Minimum order quantity must be at least 1")
    .required("Minimum order quantity is required"),
});
