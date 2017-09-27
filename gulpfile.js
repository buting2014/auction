/**
 * 开发提速工具
 */
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const minimist = require('minimist');
const replace = require('gulp-replace');
const fs = require('fs');
const Case = require('case');

// 获取命令行参数
let options = minimist(process.argv.slice(2));

gulp.task('new', function() {
  let { com, page } = options;

  if (com) {
    fs.exists('./src/components/' + com, function(exists) {
      if (exists) {
        console.warn('组件名被占用，请更换组件名');
      } else {
        gulp.start('com');
      }
    });
  }

  if (page) {
    fs.exists('./src/pages/' + page, function(exists) {
      if (exists) {
        console.warn('页面名已经被占用，请更换名字');
      } else {
        gulp.start('page', 'addPathToConfig');
      }
    });
  }
});

// 生成组件文件
gulp.task('com', function() {
  let name = options.com;

  return gulp.src('./dev-template/com-template.wpy')
    .pipe(replace('Com', Case.pascal(name)))
    .pipe(rename({basename: name, extname: '.wpy'}))
    .pipe(gulp.dest('./src/components/' + name));
});

// 生成页面文件
gulp.task('page', function() {
  let name = options.page;

  return gulp.src('./dev-template/page-template.wpy')
    .pipe(replace('TpPage', Case.pascal(name)))
    .pipe(rename({basename: name, extname: '.wpy'}))
    .pipe(gulp.dest('./src/pages/' + name));
});

// 将 page 路径添加到 app中
gulp.task('addPathToConfig', function() {
  let name = options.page;

  return gulp.src('./src/app.wpy')
    .pipe(replace('//path', `'pages/${name}/${name}',\n\t\t\t//path`))
    .pipe(gulp.dest('./src'));
});
