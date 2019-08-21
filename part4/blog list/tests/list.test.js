const listHelper = require('../utils/list_helper');
const blogHelper = require('./test_helper');


test('dummy returns one', () => {
    expect(listHelper.dummy([])).toBe(1);
});

describe('total likes', () => {
    test('when list is empty is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes([ blogHelper.initalBlogs[0] ])).toBe(7);
    });

    test('when list has many is calculated right', () => {
        expect(listHelper.totalLikes(blogHelper.initalBlogs)).toBe(36);
    });
});

describe('favorite blog', () => {
    test('when list is empty is undefined', () => {
        expect(listHelper.favoriteBlog([])).toBeUndefined();
    });

    test('when list has only one blog that is favorite', () => {
        const expectedResult = blogHelper.initalBlogs[0];
        delete expectedResult.id;
        delete expectedResult.url;

        expect(listHelper.favoriteBlog([blogHelper.initalBlogs[0]])).toEqual(expectedResult);
    });

    test('when list has many favorite blog is returned', () => {
        const expectedResult = blogHelper.initalBlogs[2];
        delete expectedResult.id;
        delete expectedResult.url;

        expect(listHelper.favoriteBlog(blogHelper.initalBlogs)).toEqual(expectedResult);
    });

    test('when list has many and multiple blogs are favorite then first favorite is returned', () => {
        let blogsWithMultipleFavorites = [...blogHelper.initalBlogs];

        blogsWithMultipleFavorites.push({
            id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 12
        });

        const expectedResult = blogHelper.initalBlogs[2];
        delete expectedResult.id;
        delete expectedResult.url;

        expect(listHelper.favoriteBlog(blogsWithMultipleFavorites)).toEqual(expectedResult);
    });
});

describe('most blogs', () => {
    test('when list is empty returns undefined', () => {
        expect(listHelper.mostBlogs([])).toBeUndefined();
    });

    test('when list has only one blog then that author is returned', () => {
        const expectedResult = {
            author: blogHelper.initalBlogs[0].author,
            blogs: 1
        };

        expect(listHelper.mostBlogs([blogHelper.initalBlogs[0]])).toEqual(expectedResult);
    });

    test('when list has many and there exists an author with more blogs then that author is returned', () => {
        let expected = {
            author: 'Robert C. Martin',
            blogs: 3
        };

        expect(listHelper.mostBlogs(blogHelper.initalBlogs)).toEqual(expected);
    });
});

describe('most liked', () => {
    test('when list is empty returns undefined', () => {
        expect(listHelper.mostLikes([])).toBeUndefined();
    });

    test('when list has only one blog then that author is returned', () => {
        const expectedResult = {
            author: blogHelper.initalBlogs[0].author,
            likes: blogHelper.initalBlogs[0].likes
        };

        expect(listHelper.mostLikes([blogHelper.initalBlogs[0]])).toEqual(expectedResult);
    });

    test('when list has many blogs then the correct author and likes is returned', () => {
        const expectedResult = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        };

        expect(listHelper.mostLikes(blogHelper.initalBlogs)).toEqual(expectedResult);
    });
});