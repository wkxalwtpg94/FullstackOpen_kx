const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
    
})

blogsRouter.post('/', async (request, response, next ) => {
    const body = request.body

    try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    console.log('What is this', decodedToken)
    const user = await User.findById(decodedToken.id)
    console.log('why is it null:', user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    if (body.title === undefined|| body.url === undefined) {
        return response.status(400).json({ error: 'content missing' })
    } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
    }
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const body = request.body

    try {
    // Verify token validity and return corresponding user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    console.log('What is this', decodedToken)
    const user = await User.findById(decodedToken.id)
    
    // fetch the blog first, then check its parameters
    const blog = await Blog.findById(request.params.id)
    console.log(blog)

    //compare parameters
    if (blog.user.toString() === decodedToken.id.toString()) {
        console.log("this is the correct user")
        await Blog.findByIdAndDelete(request.params.id) 
    } else {
        return response.status(400).json({ error: 'Incorrect user, you do not have the rights to delete this blog' })
    }

    response.status(204).end()
    } catch (error) {
        next (error)
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})



module.exports = blogsRouter