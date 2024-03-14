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

const post = function(postId, communityicon,community, communitylink, userhandlelink,
                        userhandle, username, dateofpost, linkofpost, postheader,
                        postcontent, postpicturecontent, upvotes, downvotes, numberofreplies){
    
    this.postId = postId;
    this.communityicon = communityicon;
    this.community = community;
    this.communitylink = communitylink;
    this.userhandlelink = userhandlelink;
    this.userhandle = userhandle;
    this.username = username;
    this.dateofpost = dateofpost;
    this.linkofpost = linkofpost;
    this.postheader = postheader;
    this.postcontent = postcontent;
    this.postpicturecontent = postpicturecontent;
    this.upvotes = upvotes;
    this.downvotes = downvotes;
    this.numberofreplies = numberofreplies;            
}

const users = function(username, userhandle, password, bits, aboutme){

    this.username = username;
    this.userhandle = userhandle;
    this.password = password;
    this.bits = bits;
    this.aboutme = aboutme;
}

const reply = function(userdeets, replycontent, replydate){

    this.postId = postId;
    this.userdeets = userdeets;
    this.replycontent = replycontent;
    this.replydate = replydate;
}

let currentUser = new users("gojowithiphone", "u/gojo1234", "12345", "infinite", "Nah, I'd win.");
let repliesData = [1,2,3]
let postsData = [];
let usersData = [];
let Posts = [
    {
        postId: 1111,
        communityicon: "../public/img/apple_logo.jpg",
        community: "b/apple",
        communitylink: "/main_community",
        userhandlelink: "/profilepage",
        userhandle: "u/gojo1234",
        username: "gojowithiphone",
        dateofpost: new Date(2018, 11, 24, 10, 33, 30, 0),
        linkofpost: "/samplepost",
        postheader: "Apple just dropped the new iPhone 16!!!",
        postcontent: "it good :D",
        postpicturecontent: "../public/img/gojowithiphone1.png",
        upvotes: 4447,
        downvotes: 0,
        numberofreplies: replies.length + " replies"
    },
    
];

usersData.push(userData);
app.get("/", function (req, res) {
    res.redirect('/mainpage');
});

app.get('/mainpage', (req, res) => {
    console.log
    res.render("mainpage.hbs", {posts: Posts});
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


    console.log(year, month, day, hours, mins)
    if (newtitle !== "" && newcontent !== ""){
        const newPost = {
            poster: newposter,
            title: newtitle,
            content: newcontent,
            date: {
                year: year,
                month: month,
                day: day,
                hour: hours,
                minute: mins
            },
            imgsrc: uploadedFile,
            replies: []
        }
        Posts.push(newPost)
        console.log(Posts) 
        res.redirect('/mainpage')

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
    res.redirect('/mainpage')
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
                    res.redirect('/mainpage')
                } 
            }
        }
    }
    
    
})

app.listen(3000, function () {
    console.log("Server is running on localhost 3000");
});

