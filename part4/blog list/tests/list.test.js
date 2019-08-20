const listHelper = require('../utils/list_helper');

const blogs = [
    {
        id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7
    },
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5
    },
    {
        id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
    },
    {
        id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10
    },
    {
        id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0
    },
    {
        id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2
    }
];

test('dummy returns one', () => {
    expect(listHelper.dummy([])).toBe(1);
});

describe('total likes', () => {
    test('when list is empty is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0);
    });

    test('when list has only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes([ blogs[0] ])).toBe(7);
    });

    test('when list has many is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36);
    });
});

describe('favorite blog', () => {
    test('when list is empty is undefined', () => {
        expect(listHelper.favoriteBlog([])).toBeUndefined();
    });

    test('when list has only one blog that is favorite', () => {
        const expectedResult = blogs[0];
        delete expectedResult.id;
        delete expectedResult.url;

        expect(listHelper.favoriteBlog([blogs[0]])).toEqual(expectedResult);
    });

    test('when list has many favorite blog is returned', () => {
        const expectedResult = blogs[2];
        delete expectedResult.id;
        delete expectedResult.url;

        expect(listHelper.favoriteBlog(blogs)).toEqual(expectedResult);
    });

    test('when list has many and multiple blogs are favorite then first favorite is returned', () => {
        let blogsWithMultipleFavorites = [...blogs];

        blogsWithMultipleFavorites.push({
            id: '5a422bc61b54a676234d17fc',
            title: 'Type wars',
            author: 'Robert C. Martin',
            url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
            likes: 12
        });

        const expectedResult = blogs[2];
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
            author: blogs[0].author,
            blogs: 1
        };

        expect(listHelper.mostBlogs([blogs[0]])).toEqual(expectedResult);
    });

    test('when list has many and there exists an author with more blogs then that author is returned', () => {
        let expected = {
            author: 'Robert C. Martin',
            blogs: 3
        };

        expect(listHelper.mostBlogs(blogs)).toEqual(expected);
    });
});