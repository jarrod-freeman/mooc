import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const getConfig = () => {
    const config = {
        headers: { Authorization: token }
    };

    return config;
};

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl, getConfig());
    return response.data;
};

const createBlog = async (blog) => {
    const response = await axios.post(baseUrl, blog, getConfig());
    return response.data;
};

const updateBlog = async (blog) => {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig());
    return response.data;
};

const deleteBlog = async(id) => {
    const response = await axios.delete(`${baseUrl}/${id}`, getConfig());
    return response.data;
};

export default { setToken, getAll, createBlog, updateBlog, deleteBlog };