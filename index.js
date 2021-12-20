const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3307",
    password: "",
    database: "testapi"

});
app.post("/signup", (req, res) => {
    console.log(req.body)
    // var query = "INSERT INTO user (email,password) VALUES (`${req.body.email}`,` ${req.body.password}`)"
    var sql = "INSERT INTO user (email, password) VALUES" + `(${JSON.stringify(req.body.email)}, ${JSON.stringify(req.body.password)})`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.send(sql)
    });
    // con.query(query, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });
})
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = `INSERT INTO user (username,email,password,birhdate,gender, contact) VALUES ('Company Inc', 'Highway 37')`;
})
/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });


    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});