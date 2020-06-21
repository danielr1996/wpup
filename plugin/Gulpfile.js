const gulp = require('gulp');
const zip = require('gulp-zip');
const through = require('through2');
const Vinyl = require('vinyl');

const PLUGINNAME = 'wpup-rest-plugin';

gulp.task('build', () => gulp.src('src/**/*')
    .pipe(moveVinyl(PLUGINNAME))
    .pipe(zip(PLUGINNAME + '.zip'))
    .pipe(gulp.dest('dist'))
);

gulp.task('install-local', () => gulp.src('src/**/*')
    .pipe(through.obj((file, _, cb) => {
        cb(null, file);
    }))
    .pipe(gulp.dest(dest, {overwrite: true}))
);

const moveVinyl = (path) => through.obj((file, _, cb) => {
    file.path = file['dirname'] + '/' + path + '/' + file['basename'];
    cb(null, file);
});

const dest = ((argv) => argv[argv.findIndex(arg => arg === '--dest') + 1])(process.argv);
