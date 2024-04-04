import { SchemaTypes, Schema, model } from 'mongoose'; 

const userSchema = new Schema({
    
    username: {
        type: SchemaTypes.String,
        required: true
    },
    userhandle: {
        type: SchemaTypes.String,
        required: true
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
    }
   
});

const Users = model('Users', userSchema); 
export default Users;

