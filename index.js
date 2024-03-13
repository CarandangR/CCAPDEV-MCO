const express = require("express");
const exphbs = require('express-handlebars');
const port = 3000;
const app = express();

app.use(express.static("./"));

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");



app.get("/", function (req, res) {
    //res.sendFile(__dirname + "/views/main.html"); unknown thing i dont know
    res.redirect('/home');
});

app.get('/home', (req, res) => {
    res.render("mainpage.hbs", {Title: "first sample post"});
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

app.listen(port, function () {
    console.log("Server is running on localhost 3000");
});