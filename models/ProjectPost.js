import  mongoose  from "mongoose";

const projectPostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    images: [String],
    description: {
        type: String,
        required: true,
    }
});

export default mongoose.model('projectPost', projectPostSchema);