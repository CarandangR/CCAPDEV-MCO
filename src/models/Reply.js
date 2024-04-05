import { SchemaTypes, Schema, model } from 'mongoose'; 

const replySchema = new Schema({
    
    replyId: {
        type: SchemaTypes.String,
        required: true
    },
    postId: {
        type : SchemaTypes.String,
        required: true
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'Users',
        required: true
    },
    replycontent: {
        type: SchemaTypes.String,
        required : true
    },
    replydate: {
        type: SchemaTypes.Date,
        required: true
    },
    upvotes: {
        type: SchemaTypes.Number,
        required: true
    },
    downvotes: {
        type: SchemaTypes.Number,
        required: true
    },
    isOwner: {
        type: SchemaTypes.Boolean,
        required: true
    }
   
});

const Replies = model('Replies', replySchema); 
export default Replies;

