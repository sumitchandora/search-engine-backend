import mongoose from "mongoose";

const indexSchema = new mongoose.Schema({
    word: String,
    postings: {
        type: Map,
        of: Number, // docId → frequency
    },
});

export default mongoose.model("Index", indexSchema);
