import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likeable: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },

    onModel: {
      type: String,
      required: true,
      enum: ["Tweet", "Comment"],
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Prevent duplicate likes from same user on same likeable item
likeSchema.index({ user: 1, likeable: 1, onModel: 1 }, { unique: true });

export default mongoose.model("Like", likeSchema);
