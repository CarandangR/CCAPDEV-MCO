const express = require("express");
const exphbs = require('express-handlebars');
const multer  = require('multer');
const path = require ('path');
const crypto = require ('crypto');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./"));
app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");

const post = {
    poster: "gojowithiphone",
    title: "Example",
    content: "test",
    date: {
        year: "2020",
        month: "08",
        day: "21",
        hour: "12",
        minute: "25"
    },
    imgsrc: "",
    replies: [{
        poster: "sukuna",
        replycontent: "test2",
        date: {
            year: "2020",
            month: "08",
            day: "22",
            hour: "10",
            minute: "10"
        }
    }]
};

const userData = {
    username: "gojowithiphone@gmail.com",
    password: "crazyapple",
    bits: "1000"

};


let Posts = [];
Posts.push(post);
let usersData = [];
usersData.push(userData);
app.get("/", function (req, res) {
    //res.sendFile(__dirname + "/views/main.html"); unknown thing i dont know
    res.redirect('/Create_post');
});

app.get('/mainpage', (req, res) => {
    res.render("mainpage.hbs", {Title: "first sample post"});
});

app.get('/Create_post', function (req, res) {
    res.render("CreatePost.hbs");
});

app.get('/samplepost1', (req, res) => {
    res.render("samplepost1", {
        Title: "first sample post", 
        nick: "gojowithiphone", 
        userhandle: "u/gojo1234",
        community: "b/WebDevelopment",
        PosterName: "Wala_3h",
        PosterHandle: "u/WalaEh",
        PosterBits: 1,
        DateString: "February 8, 2024",
        DateDistance: "8 days",
        PostTitle: "MDN is very convenient",
        PostContent: "It really helped us in creating this website! It gave a fast and easy way to access information to different elements. ^_^",
        ReplyUsername: "gojowithiphone",
        ReplyHandle: "u/gojo1234",
        ReplyBits: 999999,
        ReplyDate: "February 9, 2024",
        ReplyDateDistance: "7 days",
        ReplyContent: "really"
        //i highly doubt it'll be like this, just for testing though
    });
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

