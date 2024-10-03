import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

// Form to add new blogs
const BlogForm = (props) => {
  return (
    <div>
      <form onSubmit={props.addBlog}>
        <div>
          title: <input value = {props.newTitle} onChange={props.handleTitleChange}/>
        </div>
        <div>
          author: <input value = {props.newAuthor} onChange={props.handleAuthorChange}/>
        </div>
        <div>
          url: <input value = {props.newUrl} onChange = {props.handleUrlChange}/>
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

// Notification component
const Notification = ({message}) => {
  const notificationStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    borderColor: "green"
  }
  if (message === null) {
    return null
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

// ErrorNotification component
const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

// Main App Starts Here
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('a new title...')
  const [newAuthor, setNewAuthor] = useState('a new author..')
  const [newUrl, setNewUrl] = useState('type url here...')
  const [message, setMessage] =  useState(null)
  
  
  // Renders blogs the first time
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Save logged-in Users to local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Login function here
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password, })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception.response.data.error ||'Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Logout function here
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  // Event Handler to add new Blogs
  const addBlog = async (event) => {
    event.preventDefault()
    console.log("where did this button click come from", event.target)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    let blogAdded = await blogService.create(blogObject)
    setBlogs(blogs.concat(blogAdded))

    setMessage(`A new blog: ${blogAdded.title} by ${blogAdded.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")

  }

  // Handle Changers
  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }
  
  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage}/>
        <form onSubmit={handleLogin} method='post'>
          <div>
            username 
              <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password 
              <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message ={message}/>
      <ErrorNotification message={errorMessage}/>

      <div>
        {user.username} logged in 
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>

      <h2>Create New</h2>
      <BlogForm addBlog= {addBlog} newTitle = {newTitle} handleTitleChange = {handleTitleChange} newAuthor= {newAuthor} handleAuthorChange= {handleAuthorChange} newUrl = {newUrl} handleUrlChange = {handleUrlChange}></BlogForm>

      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App