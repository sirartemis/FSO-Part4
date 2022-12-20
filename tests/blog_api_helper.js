const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Как пересечь границу с Мексика - США за 10 минут',
        author: 'Василий Шишловский',
        url: 'https://Sislovskii.com',
        likes: 500
    },
    {
        title: 'Как получить повестку бесплатно у условиях частичной незанятости',
        author: 'Wolfgang Noscow',
        url: 'http://hotonos.cow',
        likes: 1023
    }
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethissoon'
    })
    await blog.save()
    await blog.delete()

    return blog.id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb
}