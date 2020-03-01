const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql');
const { PerformanceObserver, performance } = require('perf_hooks');

let qno = 1;
let sno = 0;
let score = 0;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set('view engine', 'ejs');

//Sql connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dafu*k123",
    database: "quizzler",
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
});

var question = "", answer = "";

function getQuestion() {
    let sqlquery = "SELECT answer,question FROM Questions, Answers WHERE q_id=a_id AND q_id= ?";
    connection.query(sqlquery, [qno], function (err, results,next) {
        if (err) throw err;

        question = results[0].question;
        console.log(question);
        answer = results[0].answer;
        console.log(answer);
        
    });
}



var status = [
    "Type your answer above",
    "Wrong Answer! Please try again."
];




app.get('/', function (req, res) {

        var t0= performance.now();
    getQuestion();
    var t1=performance.now();
    setTimeout(function () { res.render('index', { Question: question, Status: status[sno], score: score }); }, t1-t0);
    });

app.post('/', function (req, res) {
    if (req.body.answer === answer) {
        qno++;
        score++;
        sno = 0;

    }
    else {
        sno = 1;
    }
    if (qno > 3) {

        res.render('gameover', { score: score });
    }
    else{res.redirect('/');}
    


});


app.listen(process.env.PORT || 3000, function () {
    console.log("listening at port 3000")
});