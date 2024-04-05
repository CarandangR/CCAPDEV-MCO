import { Router } from 'express';

import mongoose from 'mongoose';
import Post from '../models/Post.js';
import Community from '../models/Community.js';
import Users from '../models/Users.js';
import Reply from '../models/Reply.js';

import multer from 'multer';
import crypto from 'crypto';
import path from 'path';



const postRouter = Router()
let currentUser = {
    username: "gojowithiphone",
    userhandle : "u/gojo",
    password : "1234",
    pfplink: "/static/img/nopfp.jpg",
    bits: "0",
    aboutme: "such empty",
    userprofilelink : "/profileview/gojowithiphone"
} // change this when session handling is implemented

postRouter.get('/Create_post', async function (req, res) {
    let communityNames = []
    const foundUser = await Users.findOne({username: currentUser.username}).populate('followedCommunities').exec() // replace with logged in user
    const communityArr = await Community.find({}).lean().exec();
    communityNames = foundUser.followedCommunities.map(community => community.community);
    console.log(communityNames)
    if (communityNames != ""){
        res.render("CreatePost.hbs", {currentUser, communityNames});
    } else{
        //alert("Please join a community first!") change this to a web redirect
    }
});


var storage = multer.diskStorage({ // file handling
    destination: './public/img/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
  
var upload = multer({ storage: storage })


postRouter.post('/submitpost', upload.single('file'), async (req,res) => {
    let uploadedFile
    try {
        if (req.file && req.file.filename) {
            uploadedFile = req.file.filename;
            console.log("Uploaded file:", uploadedFile);
        } else {
            // Handle case when req.file is undefined or req.file.filename is undefined
            console.error("Error: No file uploaded or filename not provided.");
            uploadedFile = "";
        }
    } catch (error) {
        uploadedFile = ""
        console.error("Error while getting the filename:", error);
        // Handle the error here, perhaps by sending an error response
        
    }

    async function getCount() {
        try {
            const count = await Post.countDocuments({});
            console.log("Number of documents:", count);
            return count; // Return the count directly
        } catch (err) {
            console.error(err);
        }
    }
    
    let count = await getCount();
    let postDate = new Date()

    let postDay = postDate.getDay().toString()
    let postYear = postDate.getFullYear().toString()
    let postMin = postDate.getMinutes().toString()
    let postSeconds = postDate.getSeconds().toString()

    let postId = (postDay+postYear+postMin+postSeconds)

    const foundCommuntiy = await Community.findOne({community: req.body.community})
    const communityId = foundCommuntiy._id
    console.log(communityId)

    const foundUser = await Users.findOne({username: currentUser.username}) // replace with logged in user
    const userId = foundUser._id
    console.log(userId)

    const uploadedTime = new Date()

    if (uploadedFile != ""){
        uploadedFile = "/static/img/" + uploadedFile
    }

    if (req.body.title !== "" && req.body.content !== ""){
        try {
            const result = await Post.create({
                postId : postId,
                communityinfo: new mongoose.Types.ObjectId(communityId),
                user : new mongoose.Types.ObjectId(userId),
                dateofpost: uploadedTime,
                linkofpost: "/samplepost1/" + postId,
                postheader: req.body.title,
                postcontent: req.body.content,
                postpicturecontent: uploadedFile,
                upvotes: 0,
                downvotes: 0,
                numberofreplies: 0,
                replies: []

            })

            res.redirect('/mainpage_logged')

        }catch(err){
            console.error(err)
        }
    
    
    }
})


postRouter.post('/submitreply/:id', async (req, res) => {
    console.log("Reply Post ")
    const id = req.params.id
    const foundUser = await Users.findOne({username: currentUser.username}) // replace with logged in user
    const userId = foundUser._id
    let postDate = new Date()

    let postDay = postDate.getDay().toString()
    let postYear = postDate.getFullYear().toString()
    let postMin = postDate.getMinutes().toString()
    let postSeconds = postDate.getSeconds().toString()
    let replyId = (postDay+postYear+postMin+postSeconds)
    
    if (req.body.replytextcontent != ""){
        try{
            const result = await Reply.create({
                replyId: replyId,
                postId: id,
                user : new mongoose.Types.ObjectId(userId),
                replycontent : req.body.replytextcontent,
                replydate: new Date(),
                upvotes: 0,
                downvotes: 0,
                replies: [],
                isOwner: true
            })

            try{
                const repliedPost = await Post.findOne({postId: id})
                const updatedPost = await Post.findByIdAndUpdate(repliedPost._id, {$push: {replies: result}, $inc: { numberofreplies: 1 }}, {new: true})

                console.log(updatedPost)
            }catch (err){
                console.error(err)
            }
        }catch(err){
            console.error(err)
        }
    }
    res.redirect('/samplepost1/'+id);
})

postRouter.post('/editpost', async (req, res) => {
    const postId = req.body.hiddenValue; 
    const editedPostContent = req.body.editedPost; 
    console.log("Trigger on postId" + postId + "edit with" + editedPostContent)
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { postId: postId }, 
            { $set: { postcontent: editedPostContent, postId: postId } }, 
            { new: true } 
        );

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post content updated successfully', updatedPost });
    } catch (error) {
        console.error('Error updating post content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})
postRouter.delete('/deletepost/:id', async (req, res) =>{
    const postId = req.params.id
    try{
        const deletePost = await Post.findOne({postId: postId})
        console.log(deletePost)
        if (!deletePost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (deletePost instanceof Post) {
            await Reply.deleteMany({ postId: postId });
            await Post.deleteOne({postId : deletePost.postId})

        } else {
            return res.status(500).json({ error: 'Unable to delete post' });
        }
    }catch(err){
        console.error(err)
    }
    

})


postRouter.post('/updatevote/:postId', async (req, res) => {
    console.log("post request for updating upvote/downvote received");
    const updatePost = req.body.id;
    const {type} = req.body;
    console.log(updatePost);
    try {
        let postToUpdate;
        if(type === 'upvote') {
            postToUpdate = await Post.findOneAndUpdate(
                { postId: updatePost },
                { $inc: { upvotes: 1 } },
                { new: true }
            );
        }
        else if (type === 'downvote') {
            postToUpdate = await Post.findOneAndUpdate(
                { postId: updatePost },
                { $inc: { downvotes: 1 } },
                { new: true }
            );
        }
        else {
            console.log("invalid vote type.");
        }

        if (!postToUpdate) {
            console.log("post does not exist.");
        }
        else {
            console.log("post vote updated.");
            
        }
        res.redirect('/mainpage_logged');
        
    }
    catch (error) {
        console.error('Error updating vote:', error);
        res.status(500);
    }
})


postRouter.post('/editreply', async (req, res) => {
    const replyId = req.body.replyId; 
    const editedReplyContent = req.body.editedReplyContent; 
    try {
        const updatedReply = await Reply.findOneAndUpdate(
            { replyId: replyId }, 
            { $set: { replycontent: editedReplyContent, replyId: replyId } }, 
            { new: true } 
        );

        if (!updatedReply) {
            return res.status(404).json({ error: 'Reply not found' });
        }

        res.status(200).json({ message: 'Reply content updated successfully', updatedReply });
    } catch (error) {
        console.error('Error updating post content:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

postRouter.delete('/deletereply/:id', async (req, res) =>{
    const replyId = req.params.id
    console.log("Delete trigger on reply " +replyId)
    try{
        const deleteReply = await Reply.findOne({replyId: replyId})
        console.log(deleteReply)
        if (!deleteReply) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (deleteReply instanceof Reply) {
            //await Reply.deleteMany({ postId: postId });
            await Post.updateOne({postId: deleteReply.postId}, {$inc: {numberofreplies: -1},  $pull: { replies: deleteReply._id } })
            await Reply.deleteOne({replyId : deleteReply.replyId})
            


        } else {
            return res.status(500).json({ error: 'Unable to delete Reply' });
        }
    }catch(err){
        console.error(err)
    }
    

})

postRouter.post('/submitsubreply/:replyId', async (req, res) => {
    let replyId = req.params.replyId
    const foundUser = await Users.findOne({username: currentUser.username}) // replace with logged in user
    const userId = foundUser._id
    let postDate = new Date()
    const repliedPost = await Reply.findOne({replyId: replyId})
    //console.log(repliedPost)

    let postDay = postDate.getDay().toString()
    let postYear = postDate.getFullYear().toString()
    let postMin = postDate.getMinutes().toString()
    let postSeconds = postDate.getSeconds().toString()
    let replyIdValue = (postDay+postYear+postMin+postSeconds)
    console.log(req.body.replytextcontent)
    if (req.body.replytextcontent != ""){
        try{
            const result = await Reply.create({
                replyId: replyIdValue,
                postId: repliedPost.postId,
                user : new mongoose.Types.ObjectId(userId),
                replycontent : req.body.replytextcontent,
                replydate: new Date(),
                upvotes: 0,
                downvotes: 0,
                replies: [],
                isOwner: true
            })

            try{
                const updatedPost = await Reply.findByIdAndUpdate(repliedPost._id, {$push: {replies: result}, $inc: { numberofreplies: 1 }}, {new: true})

                console.log(updatedPost)
            }catch (err){
                console.error(err)
            }
        }catch(err){
            console.error(err)
        }
    }
    res.redirect('/mainpage_logged');

})

export default postRouter;