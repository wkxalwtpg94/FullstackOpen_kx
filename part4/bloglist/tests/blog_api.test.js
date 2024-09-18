const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Note = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'Psychological Nuances',
        author: 'KX',
        url: 'inserturl.com',
        likes: 12,
      },
      {
        title: 'Travel Destinations',
        author: 'KX',
        url: 'itravel.com',
        likes: 102,
      }
]

beforeEach(async () => {
    await Note.deleteMany({})
    let blogObject = new Note(initialBlogs[0])
    await blogObject.save()
    blogObject = new Note(initialBlogs[1])
    await blogObject.save()
  })


test('notes are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
  })


test('correct number of blogs', async() => {
    const blogResponse = await api.get('/api/blogs')
    assert.strictEqual(blogResponse.body.length, 2)
})

test('unique identifier property is named id'), async() => {
    const blogResponse = await api.get('/api/blogs')
    idPresence = blogResponse.body.map(r => r.id)
    let trueOrFalse 
    if (idPresence) {
        trueOrFalse = true 
    } else {
        trueOrFalse = false
    }
    assert.strictEqual(trueOrFalse, true)
}

test('can create new blog post', async() => {
    const newBlog = {
        title :'Testing of New Valid Blog Post',
        author:'Kx',
        url:'interestingblogs.com',
        likes: 234

    }
    const blogsAtStart = await helper.blogsInDb()

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)

    const blogs = blogsAtEnd.map(b => b.title)
    assert(blogs.includes('Testing of New Valid Blog Post'))
})


test('if likes property is missing, will default to 0', async() => {
    const newBlog = {
        title :'Testing of New Valid Blog Post',
        author:'Kx',
        url:'interestingblogs.com',
    }

    console.log('Consolelog here:', newBlog)

    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const latestEntry = blogsAtEnd[blogsAtEnd.length-1]
    
    console.log('Console log here again:', latestEntry)
    assert.strictEqual(latestEntry.likes, 0)
})

test.only('if title or url missing from request, returns code 400', async() => {
    const newBlog = {
        author:'Kx',
        url:'interestingblogs.com',
        likes: 234
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect('Content-Type', /application\/json/)
        .expect(400)
})