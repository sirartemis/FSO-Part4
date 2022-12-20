const blogsRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (blog.likes === undefined) blog.likes = 0
    if (blog.author === undefined || blog.title === undefined) {
        return response.status(400).end()
    }
    await blog.save()
    response.status(201).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    await Blog.findByIdAndUpdate(request.params.id, {
        title: title,
        author: author,
        url: url,
        likes: likes
    })
    response.status(204).end()
})

module.exports = blogsRouter