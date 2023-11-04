import BlogPost from '../models/BlogPost.js';

// Controller for handling blog-related actions

// Get all blog posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post by ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new blog post
export const createPost = async (req, res) => {
  const post = req.body;
    //first check how many posts there are
    const count = await BlogPost.countDocuments();
  try {
    // const newPost = new Blog(post);
    const newPost = new BlogPost({
        ...post,
        id: count + 1,
    });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;

  try {
    const post = await Blog.findByIdAndUpdate(id, updatedPost, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Blog.findByIdAndRemove(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };