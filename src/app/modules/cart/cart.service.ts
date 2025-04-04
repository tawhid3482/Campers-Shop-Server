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
  const isUserExists = await Cart.findById(id);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart not found");
  }
  const result = await Cart.findByIdAndUpdate(
    id,
    {
      ...payload,
    },
    { new: true, runValidators: true }
  );

  return result;
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
