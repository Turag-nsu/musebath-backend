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
        const category = req.query.category;
        if(category === undefined){
            const projectPosts = await ProjectPost.find().sort({ id: -1 });
            res.json(projectPosts);
        }else{
        const projectPosts = await ProjectPost.find({category: category}).sort({ id: -1 });
        res.json(projectPosts);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Define a route for creating a new blog post
router.post('/blog-posts', async (req, res) => {
    // const count = await BlogPost.countDocuments();
    const lastBlogPost = await BlogPost.findOne().sort({ id: -1 });
    const lastBlogPostId = lastBlogPost? lastBlogPost.id : 0;
    //   const newBlogPost = new BlogPost(req.body);
    const newBlogPost = new BlogPost({
        ...req.body,
        id: lastBlogPostId + 1,
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
    let lastProjectPostId = 0;
    if(count === 0){
    }else{
        const lastProjectPost = await ProjectPost.findOne().sort({ id: -1 });
        lastProjectPostId = lastProjectPost.id;
    }
    // console.log(lastProjectPostId);
    const newProjectPost = new ProjectPost({
        ...req.body,
        id: lastProjectPostId + 1,
    });
    // console.log(req.body);
    try {
        const savedProjectPost = await newProjectPost.save();
        res.status(201).json(savedProjectPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Define a route for retrieving a single blog post
router.get('/blog-posts/:id', async (req, res) => {
    const convertedId = parseInt(req.params.id);
    // console.log(convertedId);
    try {
        const blogPost = await BlogPost.findOne({ id: convertedId });
        if (blogPost == null) {
            return res.status(404).json({ message: 'Cannot find blog post' });
        }
        res.json(blogPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// Define a route for retrieving a single project post
router.get('/project-posts/:id', async (req, res) => {
    // console.log(req.params.id);
    const convertedId = parseInt(req.params.id);
    try {
        const projectPost = await ProjectPost.findOne({ id: convertedId });
        if (projectPost == null) {
            return res.status(404).json({ message: 'Cannot find project post' });
        }
        res.json(projectPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
// Define a route for updating a blog post
// router.put('/blog-posts/:id', getBlogPost, async (req, res) => {
//     try {
//         const updatedBlogPost = await res.blogPost.set(req.body);
//         await updatedBlogPost.save();
//         res.json(updatedBlogPost);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// Define a route for updating a project post
// router.put('/project-posts/:id', getProjectPost, async (req, res) => {
//     try {
//         const updatedProjectPost = await res.projectPost.set(req.body);
//         await updatedProjectPost.save();
//         res.json(updatedProjectPost);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// });
// Define a route for deleting a blog post
router.delete('/blog-posts/:id', async (req, res) => {
    try {
        await BlogPost.deleteOne({ id: req.params.id });
        res.json({ message: 'Deleted blog post' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    
});
// Define a route for deleting a project post
router.delete('/project-posts/:id', async (req, res) => {
    try {
        await ProjectPost.deleteOne({ id: req.params.id });
        res.json({ message: 'Deleted project post' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//if we have query in the link the link looks like `${baseUrl}?=${category}`
// router.get('/project-posts', async (req, res) => {
//     const category = req.query.category;
//     console.log(category);
//     try{
//         const projectPosts = await ProjectPost.find({category: category}).sort({ id: -1 });
//         res.json(projectPosts);
//     }catch(error){
//         res.status(500).json({ message: error.message });
//     }
// });
export default router;
