import mongoose from "mongoose";

const readmeSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },

  markdown: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Readme", readmeSchema);
