const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const helper = require('./blog_api_helper')

const api = supertest(app)

jest.setTimeout(1000000)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    console.log('updated testing database')
})

describe('blog api', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })
    test('the first blog has 500 likes', async () => {
        const response = await api.get('/api/blogs')
        const likes = response.body.map(b => b.likes)
        expect(likes).toContain(500)
    })
    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Как свалить из Рашки',
            author: 'Arsenii',
            url: 'https://arsen.io',
            likes: 100500
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const authors = blogsAtEnd.map(b => b.author)

        expect(authors).toContain(
            'Arsenii'
        )
    })
    test('unique identifier of a blogs is defined', async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs[0].id).toBeDefined()
    })
    test('new blog without likes will have 0 likes', async () => {
        const newBlog = {
            title: 'Как вернуться в Рашку',
            author: 'Arsenii',
            url: 'https://arsen.io'
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        const newBlogsLikes = blogsAtEnd
            .filter(blog => blog.author === newBlog.author)[0].likes
        expect(newBlogsLikes).toBe(0)
    })
    test(
        'return status 400 if a new blog has no url or title property',
        async () => {
            const newBlog = {
                author: 'Pepyaka',
                likes: 500
            }
            await api
                .post('/api/blogs/')
                .send(newBlog)
                .expect(400)
        }
    )
    test('a blog can be deleted', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(
            helper.initialBlogs.length - 1
        )

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
})

afterAll(() => {
    mongoose.connection.close()
})