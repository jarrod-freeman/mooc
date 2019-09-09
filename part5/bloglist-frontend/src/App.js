import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState(null);

    const newBlogRef = React.createRef();

    useEffect(() => {
        if(user){
            blogService.getAll()
                .then(returnedBlogs => {
                    setBlogs(returnedBlogs);
                });
        }
        else{
            
        }
    }, [user]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');

        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try{
            const user = await loginService.login({
                username,
                password
            });

            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            
            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        }
        catch(exception){
            setMessageType('error');
            setMessage(exception.response.data.error);

            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    const handleLogout = async (event) => {
        event.preventDefault();

        window.localStorage.setItem('loggedInUser', '');
        blogService.setToken(null);
        setUser(null);
    };

    const handleCreateBlog = async (blog) => {
        try{
            const newBlog = await blogService.create(blog);
            const blogList = blogs.concat(newBlog);

            newBlogRef.current.toggleVisibility();

            setMessageType('notification');
            setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);

            setBlogs(blogList);

            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
        catch(exception){
            if(exception.response && exception.response.data){
                setMessageType('error');
                setMessage(exception.response.data.error);
            }
            else{
                setMessageType('error');
                setMessage(exception.message);
            }

            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    };

    const loginForm = () => {
        return (
            <div>
                <h2>log in to application</h2>

                <Notification message={message} messageType={messageType} />
                
                <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        );
    };

    const displayBlogs = () => {
        return (
            <div>
                <h2>blogs</h2>

                <Notification message={message} messageType={messageType} />

                <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                </p>

                <Togglable buttonLabel="new blog" ref={newBlogRef}>
                    <BlogForm formSubmit={handleCreateBlog} />
                </Togglable>

                {
                    blogs.map(blog => <Blog key={blog.id} blog={blog} />)
                }
            </div>
        )
    };

    return (
        <div>
            

            {
                user === null ?
                loginForm() :
                <div>
                    {displayBlogs()}
                </div>
            }
        </div>
    );
};

export default App;
