var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('luaslist', ['luaslist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/luaslist', function (req, res) {
  console.log('I received a GET request');

  db.luaslist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/luaslist', function (req, res) {
  console.log(req.body);
  db.luaslist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/luaslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.luaslist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/luaslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.luaslist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/luaslist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.luaslist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {Stops: req.body.Stops, Reviews: req.body.Reviews, Latitude: req.body.Latitude, Longitude: req.body.Longitude}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");