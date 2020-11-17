// Создается не просто переменная, а объект с данными, с которыми мы в дальнейшем будем работать.
var gulp = require('gulp'),
    sass = require('gulp-sass'), //переводит SASS в CSS и компилирует
    concat = require("gulp-concat"), //объединение файлов - конкатенация
    watch = require('gulp-watch'), //обновление файлов в режиме реального времени
    pug = require('gulp-pug'), //упрощенная верстка, переводит из Pug в HTML
    pugbem = require('gulp-pugbem'),
    prefixer = require('gulp-autoprefixer'), //добавляет кроссбраузерные префиксы
    imagemin = require('gulp-imagemin'), //оптимизация графики
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    cssmin = require('gulp-cssmin'), //мифинификация css
    rename = require('gulp-rename'), //переименование файлов
    uglify = require('gulp-uglify'); //для сжатия JS
    
var browserSync = require('browser-sync').create(); //производит автообновление страницы

//Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
gulp.task("sass", function(param) {
    return gulp.src("src/style/*.scss")
    	.pipe(sass())
      .pipe(concat('styles.css'))
    	.pipe(prefixer(
        ['last 2 versions'],
        {cascade: false}
      ))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream())
      .pipe(cssmin())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css'))
    param();
});

//pug
gulp.task('pug', function(param){
	return gulp.src('src/*.pug')
    .pipe(pug({
        pretty: true,
        plugins: [pugbem]
      }))
		.on('error', function(err)  {
			console.log(err);
			this.emit('end');
    })
    
		.pipe(gulp.dest("dist"))
		.pipe(browserSync.reload({
			stream: true
		}));
    param();
});

//scripts
gulp.task("scripts", function(param) {
    gulp.src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"))
  param();
});

//image
gulp.task('images', function (param) {
  return gulp.src('src/img/**/*.{jpg,png,jpeg,svg}') 
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({progressive: true}),
        imageminJpegRecompress({
          progressive: true,
          loops: 5,
          min: 70,
          max: 85,
          quality:'medium'
        }),
        imagemin.optipng({optimizationLevel: 3}),
        pngquant({quality: [0.7, 0.85], speed: 5})
      ],{
        verbose: true
      }))
    .pipe(gulp.dest('dist/img')) 
    .pipe(browserSync.reload({stream: true})); 
  param();
});

//Автообновление страницы
gulp.task('browser-sync', function (param) {
    var files = [
      '*.html',
      'css/**/*.css',
      'js/**/*.js',
      'src/**/*.scss'
  ];

  browserSync.init(files, {
      server: {
        baseDir: 'dist/'
      }
  });
  param();
});

//Обновление файлов в режиме реального времени
gulp.task('watch', function(param){
	gulp.watch('src/style/*.scss', gulp.series('sass'));
  gulp.watch('src/**/*.pug', gulp.series('pug'));
  gulp.watch('src/js/*.js', gulp.series('scripts'));
  gulp.watch('src/images/**/*', gulp.series('images'));
  param();
});

//Это таск по умолчанию. Запускает одновременно все перечисленные в нем таски.
gulp.task("default", gulp.series('watch', 'browser-sync', 'sass', 'pug', 'scripts'));