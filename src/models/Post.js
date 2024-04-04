import { SchemaTypes, Schema, model } from 'mongoose'; // ES6 syntax
// const { SchemaTypes, Schema, model } = require('mongoose'); // CommonJS (default)

const postSchema = new Schema({

    postId: {
        type: SchemaTypes.String,
        required: true
    },

    communityinfo: {
        type: SchemaTypes.ObjectId,
        ref: 'Community',
        required: true
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    dateofpost: {
        type: SchemaTypes.Date,
        required: true
    },
    linkofpost: {
        type: SchemaTypes.String,
        required: true
    },
    postheader: {
        type: SchemaTypes.String,
        required: true
    },
    postcontent: {
        type: SchemaTypes.String,
        required: true
    },
    postpicturecontent: {
        type: SchemaTypes.String,
    },
    upvotes: {
        type: SchemaTypes.Number,
        required: true
    },
    downvotes: {
        type: SchemaTypes.Number,
        required: true
    },
    numberofreplies: {
        type: SchemaTypes.Number,
        required: true
    },

    replies: {
        type: [SchemaTypes.ObjectId],
        ref: 'Replies'
    }
    
});

const Post = model('Post', postSchema); // posts collection 

export default Post;
// module.exports = Post;