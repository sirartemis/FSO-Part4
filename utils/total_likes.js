const totalLikes = blogs => {
    return blogs
        .map(blog => blog.likes)
        .reduce((sum, item) => sum + item, 0)
}

module.exports = {
    totalLikes
}