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
    tileImage: {
        type: String, // You can store the image URL
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
            image: String, // You can store the image URL
            listItems: [String],
        },
    ],
});

// Create the BlogPost model
const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
