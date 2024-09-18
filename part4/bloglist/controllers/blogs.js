const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
    
})

blogsRouter.post('/', async (request, response, next ) => {
    const blog = new Blog(request.body)
    console.log(blog)
    console.log(blog.title)
    console.log(blog.url)
    if (blog.title === undefined|| blog.url === undefined) {
        return response.status(400).json({ error: 'content missing' })
    } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
    }
})


module.exports = blogsRouter