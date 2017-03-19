const Episode = require("./models/episode");
const mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://emilio:95Databases@ds119250.mlab.com:19250/titans");

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, PATCH"
  );
  res.header("Access-Control-Allow-Methods", "PATCH");
  next();
});
app.get("/episodes", function(req, res) {
  Episode.find()
    .then(eps => {
      return eps;
    })
    .then(eps => res.send(eps))
    .catch(e => console.log(e));
});
app.patch("/episodes/:id", (req, res) => {
  console.log(req.body);
  Episode.findById(req.params.id)
    .then(ep => ep.update(req.body))
    .then(_ => res.sendStatus(200));
});
app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
