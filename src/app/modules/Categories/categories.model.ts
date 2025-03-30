import { model, Schema } from "mongoose";
import { TCategory } from "./categories.interface";

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

export const Category = model<TCategory>("category", categorySchema);
