import "dotenv/config";
import { dirname } from "path";
import { connectToMongo } from "./src/models/conn.js";
import { fileURLToPath } from 'url';
import express from "express";
import exphbs from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import moment from 'moment';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import connectMongoDBSession from 'connect-mongodb-session';
import mongoose from 'mongoose';


const MongoStore = connectMongoDBSession(session);

import router from "./src/routes/indexRouter.js";

async function main() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const app = express(); // Define app here
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/static", express.static(path.join(__dirname, "/public")));
    
    app.engine("hbs", exphbs.engine({
        extname: 'hbs',
        defaultLayout: 'main',
        layoutsDir: path.join(__dirname, 'views'),
        partialsDir: [
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
            },
            object: function(options) {
                return options.hash;
            },
            isSameUser: function(currentUser, userProfile) {
                return currentUser.username === userProfile.username;
            }
           
        }
    }));

    app.use(session({
        secret: 'MCOcarandangnuneztansecret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge:1000*60*60*24*30,
            httpOnly: true
        },
        store: new MongoStore({ 
            uri: "mongodb+srv://joshchristiannunez:TestBench1234@cluster0.ngd7avr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
            collection: 'MySessions',
            expires: 1000*60*60
          })
    }));

    app.use(router)
    app.set('views', path.join(__dirname, 'views'));
    app.set("view engine", "hbs");
    // directory for views folder
    app.set("views", "./views");
    // View cache to false
    app.set("view cache", false);

    try {
        // Connect to MongoDB
        await connectToMongo();
        console.log('Connected to MongoDB.');
    
        // Start Express App
        app.listen(3000, function () {
            console.log("Server is running on localhost 3000");
        });
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Exit with failure status code
    }
}

main();
//Objects for Each data

    




