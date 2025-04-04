import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { Cart } from "./cart.model";
import { TCart } from "./cart.interface";
import { Product } from "../Products/product.model";
import { User } from "../users/user.model";

const createCartIntoDB = async (payload: TCart) => {
  const isProductExists = await Product.findById(payload.items[0].product);

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  if (isProductExists.stock < payload.items[0].quantity) {
    throw new AppError(httpStatus.NOT_FOUND, "Product quantity is not enough");
  }
  isProductExists.stock -= payload.items[0].quantity;
  await isProductExists.save();

  const result = await Cart.create(payload);
  return result;
};

const getAllCartFromDB = async () => {
  const result = await Cart.find().populate("user");
  return result;
};

const getSingleCartFromDB = async (email: string) => {
  const user = await User.findOne( {email} );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }
  const cart = await Cart.find({ user: user._id })
    .populate({
      path: "user",
      select: "-password",
    })
    .populate("items.product");
  if (!cart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }

  return cart;
};

const updateCartIntoDB = async (id: string, payload: TCart) => {
  const existingCart = await Cart.findById(id);
  if (!existingCart) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }

  // Validate user
  const isUserExists = await User.findById(payload.user);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // Loop through updated items
  for (const updatedItem of payload.items) {
    const existingItem = existingCart.items.find(
      (item) => item.product.toString() === updatedItem.product.toString()
    );

    if (!existingItem) {
      throw new AppError(httpStatus.NOT_FOUND, "Item not found in cart");
    }

    const product = await Product.findById(updatedItem.product);
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, "Product not found");
    }

    // Calculate quantity difference
    const quantityDiff = updatedItem.quantity - existingItem.quantity;

    // Check stock availability if increasing quantity
    if (quantityDiff > 0 && product.stock < quantityDiff) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Not enough stock to increase quantity"
      );
    }

    // Update product stock
    product.stock -= quantityDiff;
    await product.save();

    // Update cart item
    existingItem.quantity = updatedItem.quantity;
    existingItem.price = updatedItem.price;
  }

  // Recalculate totalAmount
  existingCart.totalAmount = existingCart.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const updatedCart = await existingCart.save();
  return updatedCart;
};


const deleteCartIntoDB = async (id: string) => {

  const isCartExists = await Cart.findById(id)
  if (!isCartExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
   // Get product and quantity
   const productId = isCartExists.items[0].product;
   const quantity = isCartExists.items[0].quantity;
 
   // Find the product
   const product = await Product.findById(productId);
   if (!product) {
     throw new AppError(httpStatus.NOT_FOUND, "Product not found");
   }
 
   // Restore stock
   product.stock += quantity;
   await product.save();
 
   // Finally delete the cart
   const result = await Cart.findByIdAndDelete(id);
   return result
};

export const CartService = {
  createCartIntoDB,
  getAllCartFromDB,
  getSingleCartFromDB,
  updateCartIntoDB,
  deleteCartIntoDB,
};
