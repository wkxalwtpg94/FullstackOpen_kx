const dummy = (blogs) => {
    return 1
  }
  



const totalLikes = (blogs) => {

    return blogs.reduce(((sum, current) => {
         return sum + current.likes
    }), 0)

    }

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    
    return blogs.reduce((previousValue, currentValue) => {
        if ( currentValue.likes > previousValue.likes ) {
            return currentValue
        } else {
            return previousValue
        }
    })
}





  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }