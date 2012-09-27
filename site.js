var jsdom = require('jsdom');

var navItems = [];

jsdom.env({
    html: 'http://www.acando.com/no/',
    features: { QuerySelector: true, FetchExternalResources: false },
    done: function (error, window) {
        var doc = window.document;

        doc.querySelectorAll('.primary-nav .nav-main > li > a').forEach(function (anchor) {
            navItems.push({ href: anchor.href, text: anchor.innerHTML })
        });
    }
});


module.exports.loadNavItems = function () {
    return function (req, res, next) {
        res.locals.navItems = navItems;
        next();
    };
};
