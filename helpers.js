var xpath = require('xpath'),
    dom = require('xmldom').DOMParser,
    spawn = require('child_process').spawn;

module.exports.dynamicContentToObj = function (xml) {
    var doc = new dom().parseFromString(xml);
    var nodes = xpath.select('//dynamic-element/attribute::name', doc);

    return nodes.reduce(function (store, node) {
        var name = node.value;
        var path = '//dynamic-element[@name="' + name + '"]/dynamic-content/text()';
        var content = xpath.select(path, doc).shift().data;
        store[name] = content;
        return store;
    }, {});
};

module.exports.imageResizeStream = function (size) {
    var args = [
            '-resize', size + '^',
            '-gravity', 'Center',
            '-extent', size,
            '-', '-'];
    return spawn('convert', args);
};
