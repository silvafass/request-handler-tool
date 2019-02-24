var
gulp = require('gulp'),
del = require('del'),
replace = require('gulp-replace'),
uglify = require('gulp-uglify'),
gulpif = require('gulp-if'),
rename = require('gulp-rename'),
babel = require('gulp-babel'),
webpack = require('webpack-stream'),

pkg = require('./package.json');

function clean() {
  return del([
    'build/**/*'
  ]);
}

function resources() {
  return gulp.src([
    'src/**/*.*',
    '!src/**/*.js',
    '!src/**/*.jsx',
    '!src/**/*.svg'
  ])
  .pipe(gulp.dest(`build/dev/${pkg.name}`))
  .pipe(gulp.dest(`build/dist/${pkg.name}`));
}

function prepareBabel() {
  return gulp.src([
    'src/**/*.js',
    'src/**/*.jsx'
  ])
  .pipe(babel({
    presets: ['@babel/preset-react', '@babel/preset-env'],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-json-strings'
    ]
  }))
  .pipe(gulp.dest('./build/prepare'));
}

function contentScriptWebpack() {
  return gulp.src([
    'build/prepare/content_script.js'
  ])
  .pipe(webpack({
    /*mode: 'development',
    mode: 'production',*/
    mode: 'none',
    output: {
      filename: 'content_script.js',
    },
    resolve: {
      modules: ['shared', 'node_modules'],
      extensions: ['.js', '.jsx']
    }
  }))
  .pipe(replace(/\"use strict\";|\'use strict\';/g, ''))
  .pipe(gulp.dest(`./build/dev/${pkg.name}`));
}

function backgroundWebpack() {
  return gulp.src([
    'build/prepare/background.js'
  ])
  .pipe(webpack({
    /*mode: 'development',
    mode: 'production',*/
    mode: 'none',
    output: {
      filename: 'background.js',
    },
    resolve: {
      modules: ['shared', 'node_modules'],
      extensions: ['.js', '.jsx']
    }
  }))
  .pipe(replace(/\"use strict\";|\'use strict\';/g, ''))
  .pipe(gulp.dest(`./build/dev/${pkg.name}`));
}

function optionsWebpack() {
  return gulp.src([
    'build/prepare/screens/options/index.js',
  ])
  .pipe(webpack({
    /*mode: 'development',
    mode: 'production',*/
    mode: 'none',
    output: {
      filename: 'options-bundle.js',
    },
    resolve: {
      modules: ['shared', 'node_modules'],
      extensions: ['.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    }
  }))
  .pipe(gulp.dest(`./build/dev/${pkg.name}`));
}

function popupWebpack() {
  return gulp.src([
    'build/prepare/screens/popup/index.js',
  ])
  .pipe(webpack({
    /*mode: 'development',
    mode: 'production',*/
    mode: 'none',
    output: {
      filename: 'popup-bundle.js',
    },
    resolve: {
      modules: ['shared', 'node_modules'],
      extensions: ['.js', '.jsx']
    }
  }))
  .pipe(gulp.dest(`./build/dev/${pkg.name}`));
}

var build = gulp.series(
  clean,
  resources,
  prepareBabel,
  popupWebpack,
  optionsWebpack,
  contentScriptWebpack,
  backgroundWebpack,
  () => {
    return gulp.src([
      `build/dev/${pkg.name}/**/*.js`,
      `build/dev/${pkg.name}/**/*.json`,
    ])
    .pipe(replace('{{name}}', pkg.name))
    .pipe(replace('{{version}}', pkg.version))
    .pipe(replace('{{description}}', pkg.description))
    .pipe(replace('{{lastBuild}}', new Date().toLocaleString()))
    .pipe(gulp.dest(`build/dev/${pkg.name}`));
  }
);

var uglifyForDist = gulp.series(
  build,
  () => {
    return gulp.src([
      `build/dev/${pkg.name}/**/*.js`,
      `build/dev/${pkg.name}/**/*.json`,
    ])
    .pipe(gulpif(
      '!**/*.json',
      uglify({mangle: { keep_fnames: true} }).on('error', error => console.log(error.toString()))
    ))
    .pipe(gulp.dest(`build/dist/${pkg.name}`));
  }
);

var dist = gulp.series(
  uglifyForDist,
  cb => {
    return require('child_process')
    .exec(`cd build/dist && zip -r ${pkg.name}_v${pkg.version}.zip ${pkg.name}`, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  }
);

function watch() {
  gulp.watch('./src/**/*', build);
}

exports.build = build;
exports.uglify = uglifyForDist;
exports.dist = dist;
exports.default = build;
exports.watch = watch;
