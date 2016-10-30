require('dotenv').load({ silent: true });

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var cors = require('cors');
// var mongodb = require("mongodb");
// var mongoClient = mongo.mongoClient;
// var ObjectID = mongodb.ObjectID;

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("mongodb://heroku_51z2zzw9:e4002989ol707f45f96iqe8vub@ds047666.mlab.com:47666/heroku_51z2zzw9");

var AlbumSchema = mongoose.Schema({
    name: String,
    year: Number,
    trackList: Array,
    imgUrl: String,
    wikiUrl: String
});

var Album = mongoose.model('Album', AlbumSchema);


var ALBUMS_COLLECTION = "albums";

var app = express();
app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());
app.use(cors());


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

function createResource (Model) {
    return function (req, res, next) {
        var resource = new Model(req.body);
        resource.save(function (err, resource) {
            if (err) return next(err);
            res.json(resource);
        });
    };
}

function deleteResource (Model, paramId) {
    return function (req, res, next) {
        Model.findByIdAndRemove(req.params[paramId], function (err, doc) {
            if (err) return next(err);
            res.json(doc);
        });
    };
}

function updateResource (Model, paramId) {
    return function (req, res, next) {
        Model.findById(req.params[paramId], function (err, model) {
            if (err) return next(err);
            Object.keys(req.body).forEach(function (k) {
                model[k] = req.body[k];
            });
            model.save(function (err, doc) {
                if (err) return next(err);
                res.json(doc);
            });
        });
    };
}





app.get("/albums", listResources(Album));

app.post("/albums", createResource(Album));

app.get("/albums/:album", getResource(Album, 'album'));

app.put("/albums/:id", updateResource(Album, 'album'));

app.delete("/albums/:album", deleteResource(Album, 'album'));

app.use(function (req, res, next) {
    res.status(404).json({ error: 'Resource Not Found' });
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).json({ error: err });
});

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});
