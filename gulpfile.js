var
    gulp = require('gulp'),
    nunjucksRender = require('gulp-nunjucks-render'),
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    image = require('gulp-image')
    ;


gulp.task('nunjucks', function () {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/html/pages/**/*.+(html|nunjucks)')
    // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/html/templates']

        }))
        // output files in app folder
        .pipe(gulp.dest('dist'))
});


gulp.task('sass', function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});


gulp.task('browserify', function () {
    return browserify({entries: ['./src/js/entry.js']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('image', function () {
    gulp.src('./src/images/**/*.+(jpg|png)')
        .pipe(image({
            pngquant: false,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: false,
            concurrent: 10
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.+(html|nunjucks)', ['nunjucks']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['browserify']);
    gulp.watch('src/images/**/*.+(jpg|png)', ['image']);
});







