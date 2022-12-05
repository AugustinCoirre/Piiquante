const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: {type: String },
    email: {type: String, required: true },
    password: {type: String, required: true },
})

module.exports = mongoose.model('User', userSchema);

// user {
//    email: String,
//    password: String,
// }
