import { model, Schema } from "mongoose";
import { TReview } from "./reviews.interface";

const reviewsSchema = new Schema<TReview>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export const Reviews = model<TReview>("reviews", reviewsSchema);
