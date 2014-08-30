var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 8888;

var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

router.use(function(request, response, next) {
    console.log('%s %s %s', request.method, request.url, request.path);
    next();
});

router.route('/form')
    .get(function(request, response) {
        response.sendfile('./form.html');
    })
    .post(function(request, response) {
        response.json(request.body);
    });

app.use('/debug', router);

app.use('*', function(request, response) {
    response.sendfile('./index.html');
});

app.listen(port);