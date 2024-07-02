import mongoose from "mongoose";

const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    public_id: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.model("Image", ImageSchema);

export default Image;
