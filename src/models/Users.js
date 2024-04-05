import { SchemaTypes, Schema, model } from 'mongoose'; 

const userSchema = new Schema({
    
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    userhandle: {
        type: SchemaTypes.String,
        required: true,
        unique: true

    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    pfplink: {
        type: SchemaTypes.String,
        required: true
    },
    bits: {
        type: SchemaTypes.Number,
        required: true
    },
    aboutme: {
        type: SchemaTypes.String,
        required: true
    },
    userprofilelink: {
        type: SchemaTypes.String,
        required: true
    },
    followedCommunities: {
        type: [SchemaTypes.ObjectId],
        ref: 'Community',
        required: true
    },
    upvPosts: {
        type: [SchemaTypes.ObjectId],
        ref: 'Post',
        required: false
    },
    upvReplies: {
        type: [SchemaTypes.ObjectId],
        ref: 'Reply',
        required: false
    },
   downvPosts: {
        type: [SchemaTypes.ObjectId],   
        ref: 'Post',
        required: false
   },
   downvReplies: {
        type: [SchemaTypes.ObjectId],
        ref: 'Reply',
        required: false
   }
});

const Users = model('Users', userSchema); 
export default Users;

