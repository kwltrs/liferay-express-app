var liferay = require('liferay-jsonws');

var hostConfig = require('./hostConfig');
var config = {
    groupId: 10431
};

var services = liferay.createServices( hostConfig );

var portal = {};

portal.loadBlogEntries = function () {
    return function (req, res, next) {
        var options = {
            groupId: config.groupId,
            status: 0,
            max: -1
        };

        services.blogsEntry.getGroupEntries(options, function (entries) {
            res.locals.entries = entries;
            next();
        });
    };
};

module.exports = portal;
