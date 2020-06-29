let mongoose = require('mongoose');


//schema
let loginSchema = mongoose.Schema({
    password: {
        type: String
    }
});


//shcema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    gender: {
        type: String,
    },
    contact: {
        type: Number,
        required: true
    },
    login: loginSchema
});


module.exports = mongoose.model('User', userSchema);