const favoriteBlog = blogs => {
    const likesArray = blogs.map(blog => blog.likes)
    const indexOfTheMostFavorite = likesArray.indexOf(Math.max.apply(null, likesArray))
    return {
        title: blogs[indexOfTheMostFavorite].title,
        author: blogs[indexOfTheMostFavorite].author,
        likes: blogs[indexOfTheMostFavorite].likes
    }
}

module.exports = {
    favoriteBlog
}