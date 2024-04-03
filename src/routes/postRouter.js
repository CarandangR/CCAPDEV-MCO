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

    let postDay = postDate.getMinutes()
    let postYear = postDate.getFullYear()
    let postMin = postDate.getMinutes()
    let postSeconds = postDate.getSeconds()

    const foundCommuntiy = await Community.findOne({community: req.body.community})
    const communityId = foundCommuntiy._id
    console.log(communityId)

    const foundUser = await Users.findOne({username: currentUser.username}) // replace with logged in user
    const userId = foundUser._id
    console.log(userId)

    const uploadedTime = new Date()

    if (uploadedFile != ""){
        uploadedFile = "../public/img/" + uploadedFile
    }

    if (req.body.title !== "" && req.body.content !== ""){
        try {
            const result = await Post.create({
                postId : (count + 1),
                communityinfo: new mongoose.Types.ObjectId(communityId),
                user : new mongoose.Types.ObjectId(userId),
                dateofpost: uploadedTime,
                linkofpost: "/samplepost1/" + (count+1),
                postheader: req.body.title,
                postcontent: req.body.content,
                postpicturecontent: uploadedFile,
                upvotes: 0,
                downvotes: 0,
                numberofreplies: 0,
                replies: []

            })

            res.redirect('/mainpage')

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
    
    
    if (req.body.replytextcontent != ""){
        try{
            const result = await Reply.create({
                postId: id,
                user : new mongoose.Types.ObjectId(userId),
                replycontent : req.body.replytextcontent,
                replydate: new Date()
            })

            try{
                const repliedPost = await Post.findOne({postId: id})
                const updatedPost = await Post.findByIdAndUpdate(repliedPost._id, {$push: {replies: result}}, {new: true})

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

export default postRouter;