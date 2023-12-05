import mongoose from 'mongoose';

// Define the BlogPost schema
const blogPostSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    uploaderName: {
        type: String,
        required: true,
    },
    uploadDate: {
        type: String,
        required: true,
    },
    tileImage: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    mainBody: {
        type: String,
        required: true,
    },
    bodyParts: [
        {
            title: String,
            content: String,
            image: String,
            listItems: [String],
        },
    ],
});

// Create the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
