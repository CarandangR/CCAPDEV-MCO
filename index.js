const express = require("express");
const exphbs = require('express-handlebars');
const multer  = require('multer');
const path = require ('path');
const crypto = require ('crypto');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment')

let currPost = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + '/public'));
app.engine("hbs", exphbs.engine(
    {
        extname: 'hbs',
        defaultLayout: 'main', 
        layoutsDir: path.join(__dirname, 'views'),
        partialsDir  : [
            path.join(__dirname, 'views/templates'),
        ],

        helpers: {
            shortenVotes: (vote) => {
                if (vote < 1000) {
                    return vote;
                }
                return Math.round((vote / 1000) * 10) / 10 + 'K';
            },
    
            relativeTime: (date) => {
                const diff = moment().diff(date);
                
                return moment.duration(diff).humanize() + " ago";
            }
        }
    }
));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "hbs");


//Objects for Each data
const community = function (communityicon, communitydisplayname, community, communitylink, totalmembers, onlinemembers, communitybanner){
    this.communityicon = communityicon;
    this.communitydisplayname = communitydisplayname;
    this.community = community;
    this.communitylink = communitylink;
    this.totalmembers = totalmembers;
    this.onlinemembers = onlinemembers;
    this.communitybanner = communitybanner;
}
const post = function(postId, communityicon,community, communitylink, userhandlelink,
                        userhandle, username, dateofpost, linkofpost, postheader,
                        postcontent, postpicturecontent, upvotes, downvotes, numberofreplies){
    
    this.postId = postId;
    this.communityinfo = {
        communityicon : communityicon,
        community : community,
        communitylink : communitylink
    }
    this.userhandlelink = userhandlelink;
    this.userhandle = userhandle;
    this.username = username;
    this.dateofpost = dateofpost;
    this.linkofpost = linkofpost;
    this.postheader = postheader;
    this.postcontent = postcontent;
    this.postpicturecontent = postpicturecontent;
    this.upvotes = upvotes,
    this.downvotes = downvotes,
    this.numberofreplies = numberofreplies;
              
}

const users = function(username, userhandle, password, pfplink, bits, aboutme, userprofilelink, communitiesmember){

    this.username = username;
    this.userhandle = userhandle;
    this.password = password;
    this.pfplink = pfplink
    this.bits = bits;
    this.aboutme = aboutme;
    this.userprofilelink = userprofilelink;
    this.communitiesmember =  communitiesmember || [];

    this.addCommunity = function(newCommunity) {
        this.communitiesmember.push(newCommunity);
    };
}

const Reply = function(postId, username, userhandle, userhandlelink, pfplink, bits, replycontent, replydate) {
    this.postId = postId;
    this.userdeets = {
        username: username,
        userhandle: userhandle,
        userhandlelink: userhandlelink,
        pfplink: pfplink,
        bits: bits,
    };
    this.replycontent = replycontent;
    this.replydate = replydate;
};

let applecommunity = new community("../public/img/apple_logo.jpg", "Apple", "b/apple", "/main_community/apple", "100","75", "../public/img/apple_banner.jpg" );
let webdevcommunity = new community("../public/img/webdevicon.png", "Web Development", "b/webdev", "/main_community/webdev", "1000", "500", "");
let pcMasterrace = new community("../public/img/pcmrlogo.png", "PC MasterRace", "b/PCMasterRace", "/main_community/PCMasterRace", "1000", "500", "");
let pcBuilding = new community("../public/img/pcbuildinglogo.png", "PC Building", "b/PCBuilding", "/main_community/PCBuilding", "1000", "500", "");
let currentCommunity = applecommunity;

let currentUser = new users("gojowithiphone", "u/gojo1234", "12345", "../public/img/pfp.jpg", "infinite", "Nah, I'd win.", "/profileview/gojowithiphone");
let newUser = new users("sukunawithnokia", "u/sukuna", "12345", "../public/img/sukunayes.png", "1000", "Nah, I'd lose.", "/profileview/sukunawithnokia");
let newUser2 = new users("Wala_3h", "u/WalaEh", "12345", "../public/img/AYAKA.jpg", "1", "hello!", "/profileview/Wala_3h");
let newUser3 = new users("Goatkotsu", "u/yutaokkotsu", "12345", "../public/img/goatkotsu.png", "100", "Nah, I'd copy.", "/profileview/Goatkotsu");
let newUser4 = new users("LumpiangToge", "u/tunamayo", "12345", "../public/img/lumpiangtoge.jpg", "tuna", "Bonito flakes salmon cod roe", "/profileview/LumpiangToge");
let newUser5 = new users("JoshHutcherson", "u/weewoowooweewoo", "12345", "../public/img/joshhutcherson.PNG", "46290", "Stream whistle", "/profileview/JoshHutcherson");
let newUser6 = new users("RickAstley", "u/nvrgonnagive", "12345", "../public/img/rickastley.PNG", "4M", "You up, Never gonna let you down", "/profileview/RickAstley");

let communityData = []
communityData.push(applecommunity, webdevcommunity, pcMasterrace, pcBuilding)
let usersData = [];
usersData.push(currentUser, newUser, newUser2, newUser3, newUser4, newUser5, newUser6);

let Replies = [{
    postId : "1111",
    userdeets: newUser,
    replycontent : "Bakit",
    replydate : new Date(2018, 11, 25, 10, 33, 30, 0),
},{
    postId : "1111",
    userdeets: newUser,
    replycontent : "Fraudjo",
    replydate : new Date(2018, 11, 25, 10, 35, 30, 0),
},{
    postId : "1112",
    userdeets: newUser,
    replycontent : "Test",
    replydate : new Date(2018, 11, 25, 10, 35, 30, 0),
}
]



let Posts = [
    {
        postId: "1111",
        communityinfo: applecommunity,
        userhandlelink: "/profileview/gojowithiphone",
        userhandle: "u/gojo1234",
        username: "gojowithiphone",
        dateofpost: new Date(2018, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost1/1111" , 
        postheader: "Apple just dropped the new iPhone 16!!!",
        postcontent: "it good :D",
        postpicturecontent: "../public/img/gojowithiphone1.png",
        upvotes: 1,
        downvotes: 0,
        numberofreplies: Replies.length + " replies",
    },
    {
        postId: "1112",
        communityinfo: webdevcommunity,
        userhandlelink: "/profileview/Wala_3h",
        userhandle: "u/wala3h",
        username: "Wala_3h",
        dateofpost: new Date(2017, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost1/1112" , 
        postheader: "MDN is very nice",
        postcontent: "It really helped us in creating this website! It gave a fast and easy way to access information to different elements. ^_^",
        postpicturecontent: "",
        upvotes: 20,
        downvotes: 0,
        numberofreplies: Replies.length + " replies",
    },
    {
        postId: "1113",
        communityinfo: applecommunity,
        userhandlelink: "/profileview/sukunawithnokia",
        userhandle: "u/sukunaryomen",
        username: "sukunawithnokia",
        dateofpost: new Date(2019, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost1/1113" , 
        postheader: "Sell me on the iphone",
        postcontent: "I have an android right now and i love the thing to death. I have encountered zero problems with it. I had an iphone once and hated it. But it was the 4 or 4s. All of my friends have iphones and they live in a different state so I know getting an iphone would make it easier for us to communicate. The only problem I have with the iphones are that every time I get new music I have to resynce my whole phone just to add a couple songs or albums. With photos I had to use the photos app and again sync my phone in order to get them off the phone. With Android all I have to do is click and drag both my photos and music and in less than 30 seconds I am done. So r/apple sell on why I should get an ihpone</span>",
        postpicturecontent: "",
        upvotes: 20,
        downvotes: 0,
        numberofreplies: Replies.length + " replies",
    },

    {
        postId: "1114",
        communityinfo: pcMasterrace,
        userhandlelink: "/profileview/JoshHutcherson",
        userhandle: "u/weewoowooweewoo",
        username: "JoshHutcherson",
        dateofpost: new Date(2015, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost1/1114" , 
        postheader: "Need help fixing something",
        postcontent: "I think I broke a part of my pc, video proof is in this link.",
        postpicturecontent: "",
        upvotes: 20,
        downvotes: 0,
        numberofreplies: Replies.length + " replies",
    },

    {
        postId: "1115",
        communityinfo: pcBuilding,
        userhandlelink: "/profileview/Goatkotsu",
        userhandle: "u/yutaokkotsu",
        username: "Goatkotsu",
        dateofpost: new Date(2014, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost1/1115" , 
        postheader: "What are the ideal specs for a PC in 2023?",
        postcontent: "I'm thinking of building my own PC within the next couple months once I save up enough money and I need some second opinions on if the PC hardware I'm looking at would run games like Minecraft, Overwatch 2, COD, etc. smoothly/around 1080p. I'll most likely be using it for uni assignments and general browsing on the side",
        postpicturecontent: "",
        upvotes: 20,
        downvotes: 0,
        numberofreplies: Replies.length + " replies",
    }
];

app.get("/", function (req, res) {
    res.redirect('/mainpage');
    

});

app.get('/mainpage', (req, res) => {
    console.log
    res.render("mainpage.hbs", {posts: Posts});
});
app.get('/main_community/:community', function(req,res){
    const communityname = req.params.community
    for (let i = 0; i < communityData.length; i++){
        if (communityData[i].community== ("b/"+communityname)){
            currentCommunity = communityData[i]
        }
    }
    let user = currentUser; 
    let filteredPosts = []
    console.log(Posts.length)
    for (let j = 0; j < Posts.length; j++){
        if (Posts[j].communityinfo.community == ("b/"+communityname)){
            filteredPosts.push(Posts[j])
        }
    }
    console.log(currentCommunity);
    res.render ("main_community.hbs", {posts: filteredPosts, user: user, community: currentCommunity})
})
app.get('/mainpage_logged', (req, res) => {
    let user = currentUser;
    res.render("mainpage_logged.hbs", {posts: Posts, user: user});
});

app.get('/hotposts', (req, res) => {
    let user = currentUser;
    let hotposts = Posts.sort((a, b) => b.upvotes - a.upvotes);
    res.render("mainpage_logged.hbs", {posts: hotposts, user: user});
});

app.get('/newposts', (req, res) => {
    let user = currentUser;
    let newposts = Posts.sort((a, b) => b.dateofpost - a.dateofpost);
    res.render("mainpage_logged.hbs", {posts: newposts, user: user});
});
app.get('/profileview/:username', (req, res) => {
    const profilename = req.params.username
    let selectedProfile
    let userPosts = []


    for (let i = 0; i < usersData.length; i++){
        if (profilename == usersData[i].username){
            selectedProfile = usersData[i]
        }
    }
    for (let j = 0; j < Posts.length; j++){
        if (selectedProfile.username == Posts[j].username){
            userPosts.push(Posts[j])
        }
    }
    if(currentUser.username != profilename) {
        res.render("guest_profileview.hbs", {currentUser, selectedProfile, posts: userPosts});
        console.log("not own profilepage");
    }
    else{ 
        res.render("profileview.hbs", {currentUser, selectedProfile, posts: userPosts});
    }
});

app.get('/Create_post', function (req, res) {
    console.log(currentCommunity)
    res.render("CreatePost.hbs", currentUser);
});
app.get('/samplepost2', (req, res) => {
    res.render("samplepost2", {Title: "first sample post"});
});

app.get('/createpost.js', function (req, res){
    res.sendFile(__dirname + "/views/createpost.js");
})
app.get('/Sign_up', function (req, res) {
    res.render("signup.hbs");
});

app.get('/Sign_in', function (req, res) {
    res.render("signin.hbs");
});

app.get ('/samplepost1/:postId', (req, res) =>{
    const id = req.params.postId
    currPost = id;
    console.log(id)
    let returnedPost, userPosted
    let postReplies = []
    for (let i = 0 ;i < Posts.length ; i++ ){
        if (id == Posts[i].postId){
            returnedPost = Posts[i]
            for (let j = 0; j < usersData.length; j++){
                if (returnedPost.username == usersData[j].username){
                    userPosted = usersData[j]
                }
            }

            for (let k = 0; k <Replies.length; k++){
                if (returnedPost.postId == Replies[k].postId){
                    postReplies.push(Replies[k])
                }
            }
            
            
        }
    }
    console.log(postReplies)
    //const post = Posts.find(post => post.postId === parseInt(id))
    res.render ("samplepost1", {returnedPost, userPosted, reply: postReplies, currentUser})

})

var storage = multer.diskStorage({
    destination: './public/img/',
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if (err) return cb(err)
  
        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
  
var upload = multer({ storage: storage })
app.post('/submitpost', upload.single('file'), (req,res) => {
    let newposter = "gojowithiphone" //change this later
    let newtitle = req.body.title
    let uploadedFile
    try {
        uploadedFile = req.file.filename;
    } catch (error) {
        uploadedFile = ""
        console.error("Error while getting the filename:", error);
        // Handle the error here, perhaps by sending an error response
        
    }
    const newcontent = req.body.content

    const uploadedTime = new Date()
    const year = uploadedTime.getFullYear()
    const month = uploadedTime.getMonth()
    const day = uploadedTime.getDate()
    const hours = uploadedTime.getHours()
    const mins = uploadedTime.getMinutes()
    const seconds = uploadedTime.getSeconds()

    console.log(uploadedFile)
    if (uploadedFile != ""){
        uploadedFile = "../public/img/" + uploadedFile
    }

    console.log(year, month, day, hours, mins)
    if (newtitle !== "" && newcontent !== ""){

        const newPost = new post(Posts.length+1, 
        currentCommunity.communityicon,
        currentCommunity.community,
        currentCommunity.communitylink,
        currentUser.userprofilelink,
        currentUser.userhandle,
        currentUser.username,
        uploadedTime,
        "/samplepost1/" + (Posts.length + 1),
        newtitle,
        newcontent,
        uploadedFile,
        "0",
        "0",
        "0"
          )
        

          
        Posts.push(newPost)
        console.log(Posts) 
        res.redirect('/mainpage_logged')

    }
})

app.post('/submitsignup', (req,res) => { 
    let newusername = req.body.username;
    let newuserhandle = req.body.userhandle
    let newpassword = req.body.password;
    let confirmpass = req.body.confirmpass;
    
    for (let i = 0 ; i < usersData.length; i++){
        if (newusername == usersData[i].username){
            return res.status(400).json({ error: "Username already taken" });
        }
        if (newuserhandle == usersData[i].userhandle){
            return res.status(400).json({ error: "Userhandle already taken" });        }
    }
    if (newpassword == confirmpass){
        let newUser = new users(newusername,"u/"+newuserhandle,newpassword,"../public/img/nopfp.jpg", "0", "", "/profileview/"+newusername)
        
    usersData.push(newUser);
    currentUser = newUser
    console.log(usersData);
    res.redirect('/mainpage_logged')
    } else{
        return res.status(400).json({ error: "Passwords are the same" }); 
    }
})

app.post('/submitsignin', (req,res) => { 
    let username = req.body.username
    let password = req.body.password
    console.log(usersData.length);
    console.log(usersData[0].username);
    for (let i = 0; i < usersData.length; i++){
        if (usersData[i].username == username){
            for (let j = 0; j < usersData.length; j++){
                if (usersData[j].password == password){
                    res.redirect('/mainpage_logged')
                } else{
                    return res.status(400).json({ error: "Wrong Username/Password" }); 
                }
            }
        }
    }
    
    
})


app.post('/deletepost/:postId', (req, res) => {
    const id = req.params.postId
    console.log(id)
    let removedId
    for (let i = 0 ;i < Posts.length ; i++ ){
        if (id == Posts[i].postId){
            removedId = Posts[i].id
            Posts.splice(1,i)
            for (let k = 0; k <Replies.length; k++){
                if (removedId == Replies[k].postId){
                    Replies.splice(1, k)
                }
            }
            
            
        }
    }
    res.redirect('/mainpage_logged')
})

app.post('/submitreply', (req, res) => {
    let replyDate = new Date();
    let replycontent = req.body.replytextcontent;
    let currReply = new Reply(currPost, currentUser.username, currentUser.userhandle, currentUser.userprofilelink, currentUser.pfplink, currentUser.bits,replycontent,replyDate)
    Replies.push(currReply);
    console.log(currReply)
    res.redirect('/samplepost1/'+currPost);
})

app.post('/submiteditprofile', (req, res) => {
    let newDesc = req.body.profileDescription;
    currentUser.aboutme = newDesc;
    console.log("New profile description:", newDesc);
    res.redirect('/profilepage');
});

app.post('/submiteditpfp', upload.single('file'), (req,res) => {
    let uploadedFile
    try {
        uploadedFile = req.file.filename;
    } catch (error) {
        uploadedFile = ""
        console.error("Error while getting the filename:", error);
    }
    if (uploadedFile != ""){
        uploadedFile = "../public/img/" + uploadedFile
    }
    currentUser.pfplink = uploadedFile;
    console.log(uploadedFile);
    console.log(currentUser.pfplink);
    res.redirect("/profilepage");
});

app.listen(3000, function () {
    console.log("Server is running on localhost 3000");
});

