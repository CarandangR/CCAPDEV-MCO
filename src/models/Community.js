import { SchemaTypes, Schema, model } from 'mongoose'; 


const communitySchema = new Schema({
    communityicon: {
        type: SchemaTypes.String,
        required: true
    },
    communitybanner: {
        type: SchemaTypes.String,
        required: true
    },
    communitydisplayname: {
        type: SchemaTypes.String,
        required: true
    },
    community: {
        type: SchemaTypes.String,
        required: true
    },
    communitylink: {
        type: SchemaTypes.String,
        required: true
    },
    totalmembers: {
        type: SchemaTypes.Number,
        required: true
    },
    onlinemembers: {
        type: SchemaTypes.Number,
        required: true
    },
    
});

const Community = model('Community', communitySchema); 

export default Community;
