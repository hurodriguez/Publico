module.exports = {
    lineNumbers: true,
    linkify: true,
    anchor: { permalink: true },
    extendMarkdown: md => {
        // use more markdown-it plugins!
        md.use(require('markdown-it-mark'))
    }
};
