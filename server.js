// const fs = require('fs')
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 80;
// const bodyParser = require("body-parser");
// const session = require('express-session');
// const passport = require('passport');
// const cors = require('cors')
app.use(express.static(path.join(__dirname, "Public")));
app.set('view engine', 'ejs');
var corsOptions = {
    origin: 'http://localhost:5400'
}

// app.use(cors());

// app.use(cookie_parser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// extended: true
// }));

var movie_list = require("./Public/data/movies_name");

app.get("/movies", (req, res) => {
    var ind = req.query.index || 0;
    var current_url = req.get('host');
    var mov_title = req.query.title.toLowerCase();
    for (var i = 0; i < movie_list.length; i++) {
        console.log(movie_list[i].movie_name);
        if (mov_title == movie_list[i].movie_name.toLowerCase()) {
            // console.log("found");
            var dict = Object.assign({ current_url: current_url, index: ind }, movie_list[i]);
            res.render("indivi_movie", dict);
            return ;
        }
    }
    res.render("index", { alert: "no book found", current_url: current_url, index: ind, movie_list: movie_list });
})




app.use("/bollywood_series", (req, res) => {
    var ind = req.query.index || 0;
    var final_list = [];
    for (var i = 0; i < movie_list.length; i++) {
        console.log(movie_list[i].movie_name);
        if (movie_list[i].type.toLowerCase() == "bollywood series") {
            final_list.push(movie_list[i]);
        }
    }
    var current_url = req.get('host');
    var dict = Object.assign({ index: ind, current_url: current_url, type: "bollywood_series" }, { movie_list: final_list });
    res.render("specific", dict);
})

app.use("/bollywood_movies", (req, res) => {
    var ind = req.query.index || 0;
    var final_list = [];
    for (var i = 0; i < movie_list.length; i++) {
        // console.log(movie_list[i].movie_name);
        if (movie_list[i].type.toLowerCase() == "bollywood movies") {
            final_list.push(movie_list[i]);
        }
    }
    var current_url = req.get('host');
    var dict = Object.assign({ index: ind, current_url: current_url, type: "bollywood_movies" }, { movie_list: final_list });
    // console.log(dict);
    res.render("specific", dict);
})

app.use("/hollywood_series", (req, res) => {
    var ind = req.query.index || 0;
    var final_list = [];
    for (var i = 0; i < movie_list.length; i++) {

        if (movie_list[i].type.toLowerCase() == "hollywood series") {
            final_list.push(movie_list[i]);
        }
    }
    var current_url = req.get('host');
    var dict = Object.assign({ index: ind, current_url: current_url, type: "hollywood_series" }, { movie_list: final_list });
    res.render("specific", dict);
})

app.use("/hollywood_movies", (req, res) => {
    var ind = req.query.index || 0;
    var final_list = [];
    for (var i = 0; i < movie_list.length; i++) {

        if (movie_list[i].type.toLowerCase() == "hollywood movies") {
            final_list.push(movie_list[i]);
        }
    }
    var current_url = req.get('host');
    var dict = Object.assign({ index: ind, current_url: current_url, type: "hollywood_movies" }, { movie_list: final_list });
    res.render("specific", dict);
})

var mv_list = [];



app.use("/ind/", (req, res) => {
    var ind = req.query.index || 0;
    var current_url = req.get('host');
    var dict = Object.assign({ index: ind, current_url: current_url, alert: undefined }, { movie_list: movie_list });
    res.render("index", dict);
})

app.use("/", (req, res) => {
  var ind = req.query.index || 0;
var current_url = req.get('host');
    var dict = Object.assign({ index: ind, current_url: current_url, alert: undefined }, { movie_list: movie_list });
    res.render("index", dict);
})

app.listen(port, () => {
    console.log(`listining on port ${port}`);
});

