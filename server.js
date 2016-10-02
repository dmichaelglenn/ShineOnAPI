require('dotenv').load({ silent: true });

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
// var mongodb = require("mongodb");
// var mongoClient = mongo.mongoClient;
// var ObjectID = mongodb.ObjectID;


mongoose.connect(process.env.MONGODB_URI);

var AlbumSchema = mongoose.Schema({
    name: String
});

var Album = mongoose.model('Album', AlbumSchema);


var ALBUMS_COLLECTION = "albums";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

function listResources (Model) {
    return function (req, res, next) {
        Model.find(function (err, docs) {
            if (err) return next(err);
            res.json(docs);
        });
    };
}

function getResource (Model, paramId) {
    return function (req, res, next) {
        Model.findOne({_id:req.params[paramId]}, function (err, doc) {
            if (err) return next(err);
            res.json(doc);
        });
    };
}








app.get("/albums", listResources(Album));

app.post("/albums", function(req, res) {
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/albums/:album", getResource(Album, 'album'));

app.put("/albums/:id", function(req, res) {
});

app.delete("/albums/:id", function(req, res) {
});

app.use(function (req, res, next) {
    res.status(404).json({ error: 'Resource Not Found' });
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: err });
});

// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
