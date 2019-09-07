import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);

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
            
        }
    };

    const handleLogout = async (event) => {
        window.localStorage.setItem('loggedInUser', '');
        blogService.setToken(null);
        setUser(null);
    };

    const loginForm = () => {
        return (
            <div>
                <h2>log in to application</h2>

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

                <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                </p>

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