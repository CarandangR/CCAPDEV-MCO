const express = require("express");
const exphbs = require('express-handlebars');
const port = 3000;
const app = express();

app.use(express.static("./"));

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs");



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/main.html");
});

app.listen(3000, function () {
    console.log("Server is running on localhost 3000");
});