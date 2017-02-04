// generated on 2017-01-22 using generator-webapp 2.3.2
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const child = require('child_process');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const stylish = require('jshint-stylish');
const bowerFiles = require('main-bower-files');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var dev = true;

gulp.task('styles', () => {
  return gulp.src('src/assets/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('app/assets/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('src/assets/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('app/assets/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return gulp.src(files)
    .pipe($.eslint({ fix: true }))
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('src/assets/scripts/**/*.js')
    .pipe(gulp.dest('src/assets/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
    .pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/**/*.html')
    .pipe($.useref({searchPath: ['app']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('app'));
});

gulp.task('images', () => {
  return gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('app/assets/images'));
});

gulp.task('fonts', () => {
  return gulp.src(bowerFiles('**/*.{eot,svg,ttf,woff,woff2}',{debugging: false}, function (err) {})
    .concat('src/assets/fonts/**/*'))
    .pipe(gulp.dest('app/assets/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'src/*',
    '!src/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('app'));
});

// Jekyll
function jekyllLogger(color) {
    return function(buffer) {
        // bootlint when Jekyll is done initial generation
        //if ((buffer.indexOf('Server running...') !== -1) || (buffer.indexOf('...done in') !== -1) ) {
        //    gulp.start('bootlint');
        //}
        browserSync.notify(buffer);
        $.util.log($.util.colors[color]('Jekyll: ') + buffer);
    };
};

gulp.task('jekyll', function() {
  var jekyllProc = child.exec("bundle exec jekyll serve --baseurl '' --incremental --watch --force_polling");
  
  jekyllProc.stdout.on('data', jekyllLogger('blue'));
  jekyllProc.stderr.on('data', jekyllLogger('red'));
});

gulp.task('clean', del.bind(null, ['_site']));

gulp.task('serve', () => {
  runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], 'jekyll', () => {
    browserSync.init({
      notify: true,
      proxy: "localhost:4000",
      port: 9000
      // server: {
      //   baseDir: ['_site']
      // }
    });

    gulp.watch([
      'src/assets/*.html',
      'src/assets/images/**/*',
      'app/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('src/assets/styles/**/*.scss', ['styles']);
    gulp.watch('src/assets/scripts/**/*.js', ['scripts']);
    gulp.watch('src/assets/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

// //TBD
// gulp.task('serve:test', ['scripts'], () => {
//   browserSync.init({
//     notify: false,
//     port: 4000,
//     ui: false,
//     server: {
//       baseDir: 'test',
//       routes: {
//         '/scripts': '.tmp/scripts',
//         '/bower_components': 'bower_components'
//       }
//     }
//   });

//   gulp.watch('src/assets/scripts/**/*.js', ['scripts']);
//   gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
//   gulp.watch('test/spec/**/*.js', ['lint:test']);
// });


// inject bower components
gulp.task('wiredep', () => {
  gulp.src('src/assets/styles/*.scss')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('src/assets/styles'));

  gulp.src('src/**/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras']);

gulp.task('default', () => {
  return new Promise(resolve => {
    dev = false;
    runSequence(['clean', 'wiredep'], 'build', resolve);
  });
});
