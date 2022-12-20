const mostLikes = blogs => {
    const authors = Array.from(new Set(blogs.map(blog => blog.author)))
    const authorsLikesArray = authors.map(author => {
        return blogs.reduce((counter, blog) => {
            return (blog.author === author) ? counter + blog.likes : counter
        }, 0)
    })
    const maxLikes = Math.max(...authorsLikesArray)
    const mostAuthor = authorsLikesArray.indexOf(maxLikes)
    return {
        author: blogs[mostAuthor].author,
        likes: maxLikes
    }
}

module.exports = {
    mostLikes
}