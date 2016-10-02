var express = require('express');

var app = express();

function assertQueryValue (qk, av) {
    return function (req, res, next) {
        if (req.query[qk] === av) next();
        else next(new Error('Expected query value ' + qk + ' to equal ' + av));
    };
}


function middlewareOne (req, res, next) {
    if (req.query.foo === '1') {
        return next();
    }
    res.json({ msg: 'middleware 1 responded' });
}

function middlewareTwo (req, res, next) {
    if (req.query.bar === '1') {
        return next(new Error('Dont give middleware 2 bar'));
    }
    res.json({ msg: 'middleware 2 responded' });
}


app.get('/', assertQueryValue('foo', '1'), middlewareOne, middlewareTwo);

app.use(function (req, res) {
    res.json(req.query);
});

app.use(function (err, req, res, next) {
    res.status(500).json({ error: err.message });
});

var server = app.listen(4000, function () {
    console.log('Server is listening on port', server.address().port);
});
