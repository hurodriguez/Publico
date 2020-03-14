const plugins = require('./config/plugins');
const markdown = require('./config/markdown');
const sidebar = require('./config/nav');
const {themeConfig: themeConfigFn} = require('./config/theme');

const extraWatchFiles = [
    '.vuepress/config/nav/index.js',
    '.vuepress/config/theme.js'
];

module.exports = {
    title: 'NetCot',
    description: 'Just playing around',
    markdown,
    plugins,
    extraWatchFiles,
    themeConfig: themeConfigFn(sidebar)
}
