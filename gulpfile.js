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

gulp.task('config', gulp.parallel(function(){
    return gulp.src('_config.yml')
      .pipe(gulp.dest('docs'));
}));

gulp.task('styles', () => {
  return gulp.src('src/assets/styles/**/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/assets/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', () => {
  return gulp.src('src/assets/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    //.pipe($.babel())
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/assets/scripts'))
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

gulp.task('htmlonly', () => {
  var htmlmin = $.htmlmin(
    {
      collapseWhitespace: true,
      conservativeCollapse: true,
      ignoreCustomFragments: [
        /<%[\s\S]*?%>/,
        /<\?[\s\S]*?\?>/,
        /{{[\s\S]*?}}/, // ignore liquid script outputs
        /{%[\s\S]*?%}/, // ignore liquid script expressions
        /---[\s\S]*?---(\r)?\n/ // frontmatter
      ]
    }
  );
  htmlmin.on('error',function(e){
    console.log(e);
  });
  return gulp.src('src/**/*.html')
    .pipe($.plumber())
    .pipe($.useref({searchPath: ['.tmp', 'src', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', htmlmin))
    .pipe(gulp.dest('docs'));
});

gulp.task('html', gulp.series(gulp.parallel('styles', 'scripts'),'htmlonly'));

gulp.task('images', () => {
  return gulp.src('src/assets/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('docs/assets/images'));
});

gulp.task('fonts', () => {
  return gulp.src(bowerFiles('**/*.{eot,svg,ttf,woff,woff2}',{debugging: false}, function (err) {})
    .concat('src/assets/fonts/**/*'))
    .pipe(gulp.dest('docs/assets/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'src/*',
    '!src/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('docs'));
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
  return Promise.all([
      jekyllProc.stdout.on('data', jekyllLogger('blue')),
      jekyllProc.stderr.on('data', jekyllLogger('red'))
    ]);
});

gulp.task('clean', del.bind(null, ['_site']));

// inject bower components (and keep within src)
gulp.task('wiredep', () => {
  // gulp.src('src/assets/styles/**/*.scss')
  //   .pipe($.filter(file => file.stat && file.stat.size))
  //   .pipe(wiredep({
  //     exclude: ['bootstrap'],
  //     ignorePath: /^(\.\.\/)+/
  //   }))
  //   .pipe(gulp.dest('src/assets/styles'));

  return gulp.src('src/**/*.html')
    .pipe($.filter(file => file.stat && file.stat.size))
    .pipe(wiredep({
      exclude: ['bootstrap'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('src'));
});

gulp.task('serve', gulp.series(gulp.parallel('clean', 'wiredep'), gulp.parallel('config', 'html', 'fonts', 'jekyll', () => {
    browserSync.init({
      notify: true,
      proxy: "localhost:4000",
      port: 9000
      // server: {
      //   baseDir: ['_site']
      // }
    });

    gulp.watch([
      'docs/**/*.html',
      'docs/assets/styles/**/*.scss',
      'docs/assets/scripts/**/*.js',
      'docs/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('src/assets/styles/**/*.scss', gulp.series('html'));
    gulp.watch('src/assets/scripts/**/*.js', gulp.series('html'));
    gulp.watch('src/**/*.html', gulp.series('htmlonly'));
    gulp.watch('src/assets/fonts/**/*', gulp.series('fonts'));
    gulp.watch('bower.json', gulp.parallel('wiredep', 'fonts'));
  })));



gulp.task('build', gulp.series('lint', 'config', 'html', 'images', 'fonts', 'extras'));

gulp.task('default', gulp.series(gulp.parallel('clean', 'wiredep'), 'build'));
