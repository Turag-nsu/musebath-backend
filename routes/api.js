import express from 'express';
const router = express.Router();
import BlogPost from '../models/BlogPost.js';
import ProjectPost from '../models/ProjectPost.js';

// Define a route for retrieving all blog posts
router.get('/blog-posts', async (req, res) => {
    try {
        const blogPosts = await BlogPost.find().sort({ id: -1 });
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Define a route for retrieving all project posts
router.get('/project-posts', async (req, res) => {
    try {
        const projectPosts = await ProjectPost.find().sort({ id: -1 });
        res.json(projectPosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Define a route for creating a new blog post
router.post('/blog-posts', async (req, res) => {
    const count = await BlogPost.countDocuments();
    //   const newBlogPost = new BlogPost(req.body);
    const newBlogPost = new BlogPost({
        ...req.body,
        id: count + 1,
    });
    try {
        const savedBlogPost = await newBlogPost.save();
        res.status(201).json(savedBlogPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//define a route for creating a new project post
router.post('/project-posts', async (req, res) => {
    const count = await ProjectPost.countDocuments();
    const newProjectPost = new ProjectPost({
        ...req.body,
        id: count + 1,
    });
    // console.log(req.body);
    try {
        const savedProjectPost = await newProjectPost.save();
        res.status(201).json(savedProjectPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Define a middleware function for retrieving a single blog post
async function getBlogPost(req, res, next) {
    let blogPost;
    try {
        blogPost = await BlogPost.findOne({ id: req.params.id });
        if (blogPost == null) {
            return res.status(404).json({ message: 'Cannot find blog post' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.blogPost = blogPost;
    next();
}
// Define a middleware function for retrieving a single project post
async function getProjectPost(req, res, next) {
    let projectPost;
    try {
        projectPost = await ProjectPost.findOne({ id: req.params.id });
        if (projectPost == null) {
            return res.status(404).json({ message: 'Cannot find project post' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    res.projectPost = projectPost;
    next();
}
// Define a route for retrieving a single blog post
router.get('/blog-posts/:id', getBlogPost, (req, res) => {
    res.json(res.blogPost);
});
// Define a route for retrieving a single project post
router.get('/project-posts/:id', getProjectPost, (req, res) => {
    res.json(res.projectPost);
});
// Define a route for updating a blog post
router.put('/blog-posts/:id', getBlogPost, async (req, res) => {
    try {
        const updatedBlogPost = await res.blogPost.set(req.body);
        await updatedBlogPost.save();
        res.json(updatedBlogPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Define a route for updating a project post
router.put('/project-posts/:id', getProjectPost, async (req, res) => {
    try {
        const updatedProjectPost = await res.projectPost.set(req.body);
        await updatedProjectPost.save();
        res.json(updatedProjectPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
// Define a route for deleting a blog post
router.delete('/blog-posts/:id', getBlogPost, async (req, res) => {
    console.log(req.params.id);
    try {
        await res.blogPost.deleteOne({id: req.params.id});
        res.json({ message: 'Deleted blog post' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Define a route for deleting a project post
router.delete('/project-posts/:id', getProjectPost, async (req, res) => {
    // console.log(req.params.id);
    try {
        await res.projectPost.deleteOne({id: req.params.id});
        res.json({ message: 'Deleted project post' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default router;
