import { Types } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: Types.ObjectId;
  image?: string;
  rating?: number;
  productType?: "regular" | "bestSelling" | "featured";
  isDeleted:boolean
};
