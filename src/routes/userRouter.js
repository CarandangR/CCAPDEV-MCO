import { Router } from 'express';
import User from '../models/Users.js';
import Post from '../models/Post.js'
import express from 'express';
import Community from '../models/Community.js'


const userRouter = Router()
userRouter.use(express.json());
let currentUser = {
    username: "gojowithiphone",
    userhandle : "u/gojo",
    password : "1234",
    pfplink: "/static/img/nopfp.jpg",
    bits: "0",
    aboutme: "such empty",
    userprofilelink : "/profileview/gojowithiphone"
} // change this when session handling is implemented

userRouter.get('/Sign_up', function (req, res) {
    res.render("signup.hbs");
});

userRouter.get('/Sign_in', function (req, res) {
    res.render("signin.hbs");
});

userRouter.get('/profileview/:username', async (req, res) => {

    const profilename = req.params.username

    const userProfile = await User.findOne({username: profilename}).lean().exec();
    const userPosts = await Post.find({user: userProfile._id}).populate('communityinfo').populate('user').lean().exec();
    res.render("profileview.hbs", {currentUser, userProfile, posts: userPosts, profilename});



})

userRouter.post('/submitsignup', async function (req, res) {
    console.log("POST request received for /submitsignup");
    try {
        const result = await User.create({
            username: req.body.username,
            userhandle: "u/"+req.body.userhandle,
            password: req.body.password,
            pfplink: "/static/img/nopfp.jpg",
            bits: 0,
            aboutme: "Such empty",
            userprofilelink: "/profileview/"+req.body.username
        })
        console.log(result)
        res.redirect('/mainpage_logged')

    }catch(err){
        console.error(err)
    }
});

userRouter.post('/submitsignin', async function(req, res){
    const userInput = req.body.username
    const passwordInput = req.body.password
    try{
        const user = await User.findOne({ username: userInput }).lean().exec();
        //assigns as an object
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== passwordInput) {
            res.status(401).json({ message: 'Invalid password' }); 
        }
        res.redirect('/mainpage_logged')
        
    }catch(err){
        console.error(err)
    }
})

userRouter.post('/submiteditprofile/:profilename', async (req, res) => {
    const profilename = req.params.profilename
    let newDesc = req.body.profileDescription;
    try{
        const currentUser = await User.findOne({username: profilename})
        const updatedDesc = await User.findByIdAndUpdate(currentUser._id, {$push: {aboutme: newDesc}}, {new: true})
        console.log("trigger")
        console.log(updatedDesc)

    }catch (err){
        console.error(err)
    }
    console.log("New profile description:", newDesc);
    res.redirect('/profilepage');
});

userRouter.post('/followCommunity', async (req,res) => {
    const spanText = req.body.spanText;
    console.log(spanText);

    try {
        // Find the logged-in user
        const foundUser = await User.findOne({ username: currentUser.username });

        if (!foundUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Find the community based on spanText
        const community = await Community.findOne({ communitydisplayname: spanText });

        if (!community) {
            return res.status(404).json({ error: 'Community not found.' });
        }

        // Check if the user is already following the community
        const isFollowing = foundUser.followedCommunities.some(communityId => communityId.equals(community._id));
        console.log(isFollowing);

        if (!isFollowing) {
            // Add the community to followedCommunities array
            foundUser.followedCommunities.push(community);
            await foundUser.save();
            return res.status(200).json({ message: 'Community followed successfully.' });
        } else {
            // Remove the community from followedCommunities array
            foundUser.followedCommunities = foundUser.followedCommunities.filter(communityId => !communityId.equals(community._id));
            await foundUser.save();
            console.log("Community unfollowed successfully.");
            return res.status(200).json({ message: 'Community unfollowed successfully.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
})
export default userRouter;