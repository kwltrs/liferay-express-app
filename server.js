/**
 * Express-based HTTP server.
 */
var express = require('express'),
    http = require('http'),
    path = require('path');


/** middleware helpers */

function renderTemplate (template) {
    return function (req, res) {
       res.render(template); 
    };
};

function addLocals (locals) {
    return function (req, res, next) {
        Object.keys(locals).forEach(function (key) {
            res.locals[key] = locals[key];
        });
        next();
    };
}



var app = express();


/** server configuration */

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.errorHandler());
});


/** routing */

app.get('/',
    renderTemplate('index')
);

app.get('/dogs/:urlTitle',
    renderTemplate('blog-entry')
);



http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
