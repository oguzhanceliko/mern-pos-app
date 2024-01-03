import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, require: true },
        img: { type: String, require: true },
        price: { type: Number, require: true },
        category: { type: String, require: true },  //Category schemasından buraya mongodb içerisinde Relationships ile ekleme yapılacak.
    },
    { timestamps: true }
);

const Product = mongoose.model("products", ProductSchema);
export default Product;

