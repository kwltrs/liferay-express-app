var liferay = require('liferay-jsonws'),
    http = require('http'),
    helpers = require('./helpers');

var hostConfig = require('./hostConfig');
var config = {
    groupId: 10431,
    siteSetupTitle: 'site-setup'
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

portal.loadBlogEntryByUrlTitle = function () {
    return function (req, res, next) {
        var options = {
            groupId: config.groupId,
            urlTitle: req.params.urlTitle
        };

        services.blogsEntry.getEntry(options, function (entry) {
            res.locals.entry = entry;
            next();
        });
    };
};

portal.loadSiteSetup = function (callback) {
    var options = {
        groupId: config.groupId,
        urlTitle: config.siteSetupTitle
    };

    services.journalArticle.getArticleByUrlTitle(options, function (article) {
        var siteSetup = helpers.dynamicContentToObj(article.content);
        callback(siteSetup);
        return siteSetup;
    });
};


portal.sendImage = function (path) {
    var options = {
        host: hostConfig.host,
        port: hostConfig.port,
        path: path
    };

    return function (req, res) {
        http.get(options, function (clientRes) {
            res.status(clientRes.statusCode);
            res.type(clientRes.headers['content-type']);
            clientRes.pipe(res);
        });
    };
};

module.exports = portal;
