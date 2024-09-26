const { describe, test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Note = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

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

test('if title or url missing from request, returns code 400', async() => {
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


test('delete single blog post if id is valid', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(r => r.title)
    assert(!contents.includes(blogToDelete.title))
})


test('update info of single blog post if id is valid', async() => {
    const newBlog = {
        title :'Updating The Blog Post',
        author:'machineman',
        url:'newstyle.com',
        likes: 430
    }

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    console.log('this is the begginine one', blogToUpdate)
    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()

    console.log('this is the ending one', blogsAtEnd[0])
    assert.deepStrictEqual(blogsAtEnd[0], blogToUpdate)

})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        assert(result.body.error.includes('expected `username` to be unique'))
    
        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
      })
  })