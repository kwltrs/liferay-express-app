var liferay = require('liferay-jsonws');

var hostConfig = require('./hostConfig');

var services = liferay.createServices( hostConfig );

var options = {
    groupId: 10431,
    status: 0,
    max: -1
};

services.blogsEntry.getGroupEntries(options, function (entries) {
    entries.forEach(function (entry) {
        console.log(entry.entryId, entry.title);
    });
});
