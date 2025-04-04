import { Types } from "mongoose";

export type TReview = {
    product: Types.ObjectId;
    userEmail: string;
    rating: number;
    comment: string;
    
}