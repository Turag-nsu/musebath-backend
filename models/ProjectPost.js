import mongoose from "mongoose";

const projectPostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    images: [
        {
            id: Number,
            img: String,
        },
    ],
    description: [String],
});

export default mongoose.model("projectPost", projectPostSchema);
