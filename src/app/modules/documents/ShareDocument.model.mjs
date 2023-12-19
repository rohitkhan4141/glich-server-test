import mongoose from "mongoose";

const sharingSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
    required: true,
  },
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Sharing = mongoose.model("Sharing", sharingSchema);

export default Sharing;
