fis.set('project.ignore', [
    'output/**',
    'node_modules/**',
    'package.json',
    'webpack.config.js',
    'fis-conf.js',
    'index.js',
    '.babelrc',
    'README.md',

]);

fis.match("*",{
    useHash: false,
    deploy: fis.plugin('local-deliver', {
        to: '../output'
    })
});
fis.match("*.js",{
    release:"/static/js/$0"
});
fis.match("*.css",{
    release:"/static/css/$0"
});
fis.match("*.image",{
    release:"/static/css/$0"
});
