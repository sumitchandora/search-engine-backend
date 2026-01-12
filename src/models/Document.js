import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true, 
    },
    title: String,
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);
