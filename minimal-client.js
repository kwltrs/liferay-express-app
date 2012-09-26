var http = require('http'),
    qs   = require('querystring');

var query = qs.stringify({
    groupId: 10431,
    status: 0,
    max: -1
});

var options = {
    host: 'localhost',
    port: 8080,
    auth: 'agent:secret',
    path: '/api/secure/jsonws/blogsentry/get-group-entries?' + query
};

http.get(options, function (response) {
    var body = '';

    response.on('data', function (chunk) {
        body += chunk;
        console.log('Got chunk');
    });

    response.on('end', function () {
        var entries = JSON.parse(body);
        console.log('Got ' + entries.length + ' entries');
    });
});
