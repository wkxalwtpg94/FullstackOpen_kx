const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body
    
  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({ error: 'username or password must be at least 3 characters'})
  }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
      })
    try {
        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        response.status(500).json({ error: 'An error occurred while saving the user.' });
    }


})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, id: 1})
  response.json(users)
})


module.exports = usersRouter