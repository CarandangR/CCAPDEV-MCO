import { SchemaTypes, Schema, model } from 'mongoose'; 

const replySchema = new Schema({
    
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
    }
   
});

const Replies = model('Replies', replySchema); 
export default Replies;

