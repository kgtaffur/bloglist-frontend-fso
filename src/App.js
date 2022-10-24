import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/NewBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    if (user !== null) {
      blogService.getAll().then(blogs => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      setMessage('Login successful');
      setMessageType('success');
    } catch (exception) {
      setMessage('Wrong credentials');
      setMessageType('error');
    } finally {
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogService.setToken(null);
    setMessage('Logout successful');
    setMessageType('success');
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const addBlog = async (newObject) => {
    try {
      const newBlog = await blogService.create(newObject);
      setBlogs(blogs.concat(newBlog));
      setMessage(`A new blog "${newBlog.title} by ${newBlog.author} added`);
      setMessageType('success');
    } catch (exception) {
      setMessage('Error adding new blog');
      setMessageType('error');
    } finally {
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const updateBlog = async (updatedObject, id) => {
    try {
      const updatedBlog = await blogService.update(updatedObject, id);
      const updatedBlogs = blogs.map((blog) => {
        if (updatedBlog.id === blog.id) {
          return { ...blog, likes: blog.likes + 1 };
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    } catch (exception) {
      setMessage('Error updating blog');
      setMessageType('error');
    } finally {
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  const deleteBlog = async (id, title, author) => {
    if (window.confirm(`Remove blog "${title}" by ${author}`)) {
      try {
        await blogService.remove(id);
        setBlogs(blogs.filter((blog) => blog.id !== id));
        setMessage(`Blog "${title}" by ${author} deleted`);
        setMessageType('success');
      } catch (exception) {
        setMessage('Error deleting blog');
        setMessageType('error');
      } finally {
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      }
    }
  };

  const sortByLikes = (blog1, blog2) => {
    if (blog1.likes < blog2.likes) {
      return -1;
    }
    if (blog1.likes > blog2.likes) {
      return 1;
    }
    return 0;
  };

  return (
    <div>
      {user ? (
        <h2>Blogs</h2>
      ) : (
        <h2>Log in to application</h2>
      )}
      <Notification
        message={message}
        type={messageType}
      />
      {user ? (
        <>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <Togglable buttonLabel="New blog">
            <NewBlogForm
              createBlog={addBlog}
            />
          </Togglable>
          <br />
          <div>
            {blogs.sort(sortByLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                owner={user.username}
              />
            )}
          </div>
        </>
      ) : (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};

export default App;
