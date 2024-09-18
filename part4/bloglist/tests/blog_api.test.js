const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Note = require('../models/blog')

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


test.only('notes are returned as json', async() => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

after(async () => {
    await mongoose.connection.close()
  })


test.only('correct number of blogs', async() => {
    const blogResponse = await api.get('/api/blogs')
    assert.strictEqual(blogResponse.body.length, 2)
})

test.only('unique identifier property is named id'), async() => {
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