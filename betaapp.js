var express = require('express');
var app     = express();

app.use(express.static(__dirname));

app.get('/search', function(req, res){
 /* res.send({ hello : 'world' }); */
    res.send("Hi there");
});
app.get('/list', function(req, res) { });


app.listen(3012);
console.log("Server listening on port 3012");