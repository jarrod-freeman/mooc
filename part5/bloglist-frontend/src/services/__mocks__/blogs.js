const blogs = [
    {
        title: 'Blog Title',
        author: 'Blog Author',
        id: 1
    }
];

const getAll = () => {
    return Promise.resolve(blogs);
};

const setToken = () => {

};

export default { getAll, setToken };