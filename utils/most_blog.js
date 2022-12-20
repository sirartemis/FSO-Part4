const mostBlog = blogs => {
    const authors = Array.from(new Set(blogs.map(blog => blog.author)))
    const authorsBlogsArray = authors.map(author => {
        return blogs.reduce((counter, blog) => {
            return (blog.author === author) ? counter + 1 : counter
        }, 0)
    })
    const indexOfMostBlog = authorsBlogsArray.indexOf(Math.max.apply(null, authorsBlogsArray))
    return {
        author: blogs[indexOfMostBlog].author,
        blogs: Math.max(...authorsBlogsArray)
    }
}

module.exports = {
    mostBlog
}