const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes;
    };

    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    const reducer = (favorite, item) => {
        if(favorite.likes === undefined){
            return item;
        }

        return item.likes > favorite.likes ? item : favorite;
    };

    let favorite = undefined;

    if(blogs.length !== 0){
        favorite = blogs.reduce(reducer, {});
        delete favorite.id;
        delete favorite.url;
    }

    return favorite;
};

const mostBlogs= (blogs) => {
    const authorReducer = (results, item) => {
        let authorResult = results.filter((x) => x.author === item.author);

        if(authorResult.length === 0){
            authorResult = {
                author: item.author,
                blogs: 1
            };

            results.push(authorResult);
        }
        else{
            authorResult[0].blogs++;
        }

        return results;
    };

    let mostBlog = undefined;

    if(blogs.length !== 0){
        const blogReducer = (most, item) => {
            return item.blogs > most.blogs ? item : most;
        };

        mostBlog = blogs.reduce(authorReducer, []).reduce(blogReducer);
    }

    return mostBlog;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
};