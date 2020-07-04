let mongoose = require('mongoose');

//shcema
let articleSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    created_at:{
        type: String,
        required: true
    }
});

let Article = module.exports = mongoose.model('Article', articleSchema);