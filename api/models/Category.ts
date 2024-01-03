import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    title: { type: String, require: true }
}, { timestamps: true })


export default mongoose.model("categories", CategorySchema);
