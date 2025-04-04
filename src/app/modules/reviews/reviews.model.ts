import { model, Schema } from "mongoose";
import { TReview } from "./reviews.interface";

const reviewsSchema = new Schema<TReview>({
  product: { type: Schema.Types.ObjectId, ref: "product", required: true },
  userEmail: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true },
});

export const Reviews = model<TReview>("reviews", reviewsSchema);
