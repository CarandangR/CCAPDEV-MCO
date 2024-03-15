const express = require("express");
const exphbs = require('express-handlebars');
const multer  = require('multer');
const path = require ('path');
const crypto = require ('crypto');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
const moment = require('moment')

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
const community = function (communityicon, community, communitylink){
    this.communityicon = communityicon;
    this.community = community;
    this.communitylink = communitylink;
}
const post = function(postId, communityinfo, communityicon,community, communitylink, userhandlelink,
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

const users = function(username, userhandle, password, pfplink, bits, aboutme){

    this.username = username;
    this.userhandle = userhandle;
    this.password = password;
    this.pfplink = pfplink
    this.bits = bits;
    this.aboutme = aboutme;
    this.userprofilelink = userprofilelink;
}

const Reply = function(postId, username, userhandle, password, pfplink, bits, aboutme, replycontent, replydate) {
    this.postId = postId;
    this.userdeets = {
        username: username,
        userhandle: userhandle,
        password: password,
        pfplink: pfplink,
        bits: bits,
        aboutme: aboutme
    };
    this.replycontent = replycontent;
    this.replydate = replydate;
};

let currentUser = new users("gojowithiphone", "u/gojo1234", "12345", "../public/img/pfp.jpg", "infinite", "Nah, I'd win.");
let newUser = new users("sukunewithnokia", "u/sukuna", "12345", "../public/img/sukunayes.png", "1000", "Nah, I'd lose.");
let applecommunity = new community("../public/img/apple_logo.jpg", "b/apple", "/main_community/apple")
let webdevcommunity = new community("../public/img/webdevicon.png", "b/webdev", "/main_community/webdev")
 
let repliesData = [1,2,3]
let usersData = [];
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
        userhandlelink: "/profilepage",
        userhandle: "u/gojo1234",
        username: "gojowithiphone",
        dateofpost: new Date(2018, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost1/1111" , 
        postheader: "Apple just dropped the new iPhone 16!!!",
        postcontent: "it good :D",
        postpicturecontent: "../public/img/gojowithiphone1.png",
        upvotes: 4447,
        downvotes: 0,
        numberofreplies: repliesData.length + " replies",
        replies : [{
            
        }]
    },
    {
        postId: "1112",
        communityinfo: webdevcommunity,
        userhandlelink: "/profilepage",
        userhandle: "u/wala3h",
        username: "sukunaryomen",
        dateofpost: new Date(2018, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost1/1112" , 
        postheader: "MDN is very nice",
        postcontent: "It really helped us in creating this website! It gave a fast and easy way to access information to different elements. ^_^",
        postpicturecontent: "",
        upvotes: 20,
        downvotes: 0,
        numberofreplies: repliesData.length + " replies",
        replies : [{
            
        }]
    }
    
];









usersData.push(currentUser);
app.get("/", function (req, res) {
    res.redirect('/mainpage_logged');
});

app.get('/mainpage', (req, res) => {
    console.log
    res.render("mainpage.hbs", {posts: Posts});
});
app.get('/main_community/:community', function(req,res){
    const communityname = req.params.community
    let filteredPosts = []
    console.log("b/"+communityname)
    for (let i = 0; i < Posts[i].length; i++){
        if (Posts[i].communityinfo.community == ("b/"+communityname)){
            filteredPosts.push(Posts[i])
        }
    }
    console.log(filteredPosts)
    res.render ("main_community.hbs")
})
app.get('/mainpage_logged', (req, res) => {
    let user = currentUser;
    console.log(user);
    res.render("mainpage_logged.hbs", {posts: Posts, user: user});
});

app.get('/Create_post', function (req, res) {
    res.render("CreatePost.hbs");
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
    console.log(returnedPost)
    //const post = Posts.find(post => post.postId === parseInt(id))
    res.render ("samplepost1", {returnedPost, userPosted, reply: postReplies})

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


    console.log(year, month, day, hours, mins)
    if (newtitle !== "" && newcontent !== ""){
        const newPost = {
            postId : Posts.length + 1,
            userhandle : "u/gojo1234",
            username : "gojowithiphone",
            dateofpost: {
                year: year,
                month: month,
                day: day,
                hour: hours,
                minute: mins,
                seconds : seconds
            },
            linkofpost: "/samplepost1/" + (Posts.length + 1),
            postheader: newtitle,
            postcontent: newcontent,
            postpicturecontent: "../public/img/" + uploadedFile,
            upvotes : "0",
            downvotes : "0",
            numberofreplies : "0" 
        }
        Posts.push(newPost)
        console.log(Posts) 
        res.redirect('/mainpage_logged')

    }
})

app.post('/submitsignup', (req,res) => { 
    let newusername = req.body.username;
    let newpassword = req.body.password;
    let confirmpass = req.body.confirmpass;
    
    if (newpassword == confirmpass){
        const newUser ={
            username: newusername,
            password: newpassword,
            bits: "0"
        };
    usersData.push(newUser);
    console.log(usersData);
    res.redirect('/mainpage_logged')
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



app.listen(3000, function () {
    console.log("Server is running on localhost 3000");
});

