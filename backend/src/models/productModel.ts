import mongoose, { Schema, Document, Types } from 'mongoose';

export interface Review {
  userId: Types.ObjectId; // Correct type for ObjectId
  comment: string;
  rating: number;
}

export interface ProductDocument extends Document {
  title: string;
  brand: string;
  category: string;
  images: string[];
  price: number;
  rating: number;
  reviews: Review[];
  returnPolicy: string;
  shippingInformation: string;
}

const ReviewSchema: Schema<Review> = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Correct reference
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
});

const ProductSchema: Schema<ProductDocument> = new Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String, required: true }],
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviews: [ReviewSchema],
  returnPolicy: { type: String, required: true },
  shippingInformation: { type: String, required: true },
});

const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
export default Product;
