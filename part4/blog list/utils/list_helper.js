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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};