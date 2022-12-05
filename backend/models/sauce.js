const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    _id: {type: String },
    userId: {type: String, required: true },
    name: {type: String, required: true },
    manufacturer: {type: String, required: true },
    description: {type: String, required: true },
    mainPepper: {type: String, required: true },
    imageUrl: {type: String, required: true },
    heat: {type: Number, },
    likes: {type: Number, },
    dislikes: {type: Number, },
    usersLiked: {type: Array, },
    usersDisliked: {type: Array, },
})

module.exports = mongoose.model('Sauce', sauceSchema);

// sauce {
//    userId: string,
//    name: string,
//    manufacturer: string,
//    description: string,
//    mainPepper: string,
//    imageUrl: string,
//    heat: Number,
//    likes: Number,
//    dislikes: Number,
//    usersLiked: [string userId],
//    usersDisliked: [string userId],
// }