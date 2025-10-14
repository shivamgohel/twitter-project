import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    numberOfRetweets: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: ObjectId,
        // ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Tweet = mongoose.model("Tweet", tweetSchema);

export default Tweet;
