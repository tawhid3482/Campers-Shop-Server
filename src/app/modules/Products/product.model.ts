import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "category", required: true },
  image: { type: [String], required: false },
  rating: { type: Number, required: false },
  productType: { 
    type: String, 
    enum: ["regular", "bestSelling", "featured"], 
    default: "regular" 
  },
  isDeleted:{type:Boolean, default:false}

});

export const Product = model<TProduct>("product", productSchema);
