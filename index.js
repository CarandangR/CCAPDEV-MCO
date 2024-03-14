const express = require("express");
const exphbs = require('express-handlebars');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./"));
app.engine("hbs", exphbs.engine({extname: 'hbs', partialsDir: __dirname + '/views/templates/'}));
app.set("view engine", "hbs");
app.set("views", "./views");
app.set("view cache", false);

const post = {
    poster: "gojowithiphone",
    title: "Example",
    content: "test",
    date: "February 1",
    replies: [{
        poster: "sukuna",
        replycontent: "test2",
        date: "March 14"
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


app.get('/Sign_up', function (req, res) {
    res.render("signup.hbs");
});

app.get('/Sign_in', function (req, res) {
    res.render("signin.hbs");
});
app.post('/submitpost', (req,res) => {
    let newposter = "gojowithiphone" //change this later
    let newtitle = req.body.title
    const newcontent = req.body.content
    console.log(newtitle)
    console.log(newcontent)
    if (newtitle !== "" && newcontent !== ""){
        const newPost = {
            poster: newposter,
            title: newtitle,
            content: newcontent,
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
