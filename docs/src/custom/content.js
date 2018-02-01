var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports =
    '# Introduction\n' +
    fs.readFileSync('./content/introduction.md', 'utf8') + '\n' +

    '# Get started\n' +
    fs.readFileSync('./content/get_started.md', 'utf8') + '\n' +
    '# React and ReViz3d\n' +
    fs.readFileSync('./content/react_and_reviz.md', 'utf8') + '\n' +
    '# Develop ReViz3d\n' +
    fs.readFileSync('./content/development.md', 'utf8') + '\n' +
    '# DocBox Examples\n' +
    fs.readFileSync('./content/example.md', 'utf8') + '\n';