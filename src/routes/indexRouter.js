import { Router } from 'express';
import userRouter from './userRouter.js';
import postRouter from './postRouter.js';
import Post from '../models/Post.js';
import Users from '../models/Users.js';
import Reply from '../models/Reply.js'

import Community from '../models/Community.js';

const router = Router()

/*let currentUser = {
    username: "Nyett",
    userhandle : "u/nyet",
    password : "Pass1234",
    pfplink: "/static/img/nopfp.jpg",
    bits: "0",
    aboutme: "such empty",
    userprofilelink : "/profileview/Nyett"
} // change this when session handling is implemented*/

let currentUser = {
    username: "gojowithiphone",
    userhandle : "u/gojo",
    password : "1234",
    pfplink: "/static/img/nopfp.jpg",
    bits: "0",
    aboutme: "such empty",
    userprofilelink : "/profileview/gojowithiphone"
} // change this when session handling is implemented

router.get("/", function (req, res) {
    res.redirect('/mainpage_logged');

});

router.get('/mainpage', async (req, res) => {
    /*const data = [
        {communityicon: "../public/img/apple_logo.jpg", communitybanner: "/static/img/apple_banner.jpg", communitydisplayname: "apple", community: "b/apple",
        communitylink: "/main_community/apple", totalmembers: "100", onlinemembers: "75"},
        {communityicon: "../public/img/webdevicon.png", communitybanner: "/static/img/apple_banner.jpg", communitydisplayname: "web development", community: "b/webdev",
        communitylink: "/main_community/webdev", totalmembers: "1000", onlinemembers: "500"}
    ]
    const userData = [
        {username: "gojowithiphone", userhandle: "u/gojo", password: "1234", pfplink: "/static/img/nopfp.jpg", bits: "0",
        aboutme: "Such empty", userprofilelink: "/profileview/gojowithiphone", followedCommunities: []}
    ]
    Users.insertMany(userData)
    
    Community.insertMany(data)
        .then(docs => {
            console.log('Data inserted:', docs);
        })
        .catch(err => {
            console.error('Error inserting data:', err);
        });*/
    
    const postsArr = await Post.find({}).populate('communityinfo').populate('user').lean().exec();
    res.render("mainpage.hbs", {posts: postsArr}); //readd posts
});

router.get('/main_community/:community', async function(req,res){

    const communityname = "b/"+req.params.community
    console.log(communityname)
    const foundUser = await Users.findOne({ username: currentUser.username });
    const community = await Community.findOne({ community: communityname }).lean().exec();
    console.log(community)
    const isFollowing = foundUser.followedCommunities.some(communityId => communityId.equals(community._id));


    const filteredPosts = await Post.find({communityinfo: community._id }).populate('communityinfo').populate('user').lean().exec();
    res.render ("main_community.hbs", {posts: filteredPosts, user: currentUser, community, isFollowing})
})

router.get('/mainpage_logged', async (req, res) => {
    //let user = currentUser;
    console.log("trigger")
    const postsArr = await Post.find({}).populate('communityinfo').populate('user').lean().exec();
    res.render("mainpage_logged.hbs", {posts: postsArr}); //readd posts
});

router.get('/hotposts', async (req, res) => {
    const postsArr = await Post.find({}).populate('communityinfo').populate('user').lean().exec();
    let hotposts = postsArr.sort((a, b) => b.upvotes - a.upvotes);
    res.render("mainpage_logged.hbs", {posts: hotposts} );//readd posts
});

router.get('/newposts', async (req, res) => {
    const postsArr = await Post.find({}).populate('communityinfo').populate('user').lean().exec();
    let newposts = postsArr.sort((a, b) => b.dateofpost - a.dateofpost);
    res.render("mainpage_logged.hbs", {posts:newposts} );//readd posts
});

router.get('/newpostscommunity/:communityname', async (req, res) => {
    let currentCommunity = "b/"+req.params.communityname
    console.log(currentCommunity)
    const foundUser = await Users.findOne({ username: currentUser.username });
    const community = await Community.findOne({ community: currentCommunity }).lean().exec();
    const isFollowing = foundUser.followedCommunities.some(communityId => communityId.equals(community._id));


    const filteredPosts = await Post.find({communityinfo: community._id }).populate('communityinfo').populate('user').lean().exec();
    let newposts = filteredPosts.sort((a, b) => b.dateofpost - a.dateofpost);


    res.render ("main_community.hbs", {posts: newposts, user: currentUser, community, isFollowing})
})

router.get('/hotpostscommunity/:communityname', async (req, res) => {
    let currentCommunity = "b/"+req.params.communityname

    const foundUser = await Users.findOne({ username: currentUser.username });
    const community = await Community.findOne({ community: currentCommunity }).lean().exec();
    const isFollowing = foundUser.followedCommunities.some(communityId => communityId.equals(community._id));


    const filteredPosts = await Post.find({communityinfo: community._id }).populate('communityinfo').populate('user').lean().exec();
    let hotposts = filteredPosts.sort((a, b) => b.upvotes - a.upvotes);


    res.render ("main_community.hbs", {posts: hotposts, user: currentUser, community, isFollowing})
})

router.get ('/samplepost1/:postId', async(req, res) =>{
    const id = req.params.postId;
    let postOwner = false;
    let foundPost = await Post.findOne({ postId: id })
        .populate('communityinfo')
        .populate('user')
        .populate({
            path: 'replies',
            populate: {
                path: 'user',
                model: 'Users'
            }
        })
        .lean()
        .exec();
    
    let correctPost = foundPost;

    if (correctPost.user.username === currentUser.username) {
        postOwner = true;
    }
    for (let i = 0; i < foundPost.replies.length; i++) {
        const reply = foundPost.replies[i];
        if (reply.user.username === currentUser.username) {
            reply.isOwner = true;
        } else {
            reply.isOwner = false;
        }
    }
    


    //console.log(correctPost)

    res.render ("samplepost1", {correctPost: correctPost, currentUser: currentUser, id, postOwner})


})



router.use(userRouter)
router.use(postRouter)
export default router;
