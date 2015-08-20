var concat = require('gulp-concat'),
    del = require('del'),
    gulp = require('gulp'),
    gutil = require("gulp-util"),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    webpackConfigDev = require('./webpack.config.js'),
    webpackConfigDist = require('./webpack.dist.config.js');

var js_files_library = [
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
    'node_modules/angular-resource/angular-resource.min.js',
    'node_modules/react/dist/react.min.js',
    'node_modules/ngreact/ngReact.min.js',
    'node_modules/mathjs/dist/math.min.js'
];

gulp.task('scripts-library', function() {
    return gulp.src(js_files_library)
        .pipe(concat('library.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('build'));
});

var webpackBuild = function(callback, config, name) {
    webpack(config, function(err, stats) {
        if (err) throw new gutil.PluginError(name, err);
        gutil.log("["+name+"]", stats.toString({
           colors: true
        }));
        callback();
    });
};

gulp.task("webpack:build", function(callback) {
    webpackBuild(callback, webpackConfigDist, "webpack:build");
});

gulp.task("webpack:build-dev", function(callback) {
    webpackBuild(callback, webpackConfigDev, "webpack:build-dev");
});

gulp.task("webpack-dev-server", function(callback) {
    var realHost = '127.0.0.1'; // replace with real IP for remote connections, also modify BACKEND_URL in webpack
    var bindHost = '127.0.0.1'; // replace with 0.0.0.0 to allow remote connections
    var webpackPort = 3000;
    var webpackHost = realHost + ':' + webpackPort;

    webpackConfigDev.output.publicPath = 'http://' + webpackHost + '/';

    new WebpackDevServer(webpack(webpackConfigDev), {
        historyApiFallback: true,
        hot: true,
        inline: true,
        publicPath: webpackConfigDev.output.publicPath,
        contentBase: 'build',
    }).listen(webpackPort, bindHost, function(err) {
        if (err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "Go to http://" + webpackHost + "/webpack-dev-server/");
    });
});

gulp.task('copy', function() {
    gulp.src(['./src/index.html', './src/favicon.png', './src/robots.txt'])
        .pipe(gulp.dest('./build'));
});

gulp.task('clean', function() {
    del('build');
});

gulp.task('build', ['copy', 'webpack:build', 'scripts-library']);
gulp.task('build-dev', ['copy', 'webpack:build-dev', 'scripts-library']);
gulp.task('default', ['copy', 'webpack-dev-server', 'scripts-library']);
