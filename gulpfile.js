let progect_folder = "dist";
let sourse_folder = "#src";

let path = {
  build: {
    html: progect_folder + "/",
    css: progect_folder + "/css/",
    js: progect_folder + "/js/",
    image: progect_folder + "/image/",
    fonts: progect_folder + "/fonts/",
  },
  src: {
    html: [sourse_folder + "/*.html", "!" + sourse_folder + "/_*.html"],
    css: progect_folder + "/scss/style.scss/",
    js: sourse_folder + "/js/script.js",
    image: sourse_folder + "/image/**/*.{jpg, png, svg, gif, ico,webp}",
    fonts: sourse_folder + "/fonts/*.ttf",
  },
  watch: {
    html: sourse_folder + "/**/*.html",
    css: progect_folder + "/scss/**/*.scss/",
    js: sourse_folder + "/js/**/*.js",
    image: sourse_folder + "/image/**/*.{jpg, png, svg, gif, ico,webp}",
  },
  clean: "./" + progect_folder + "/",
};

let { src, dest } = require("gulp"),
  gulp = require("gulp"),
  browsersync = require("browser-sync").create(),
  fileinclude = require("gulp-file-include"),
  del = require("del"),
  scss = require("gulp-sass");

function browserSync(params) {
  browsersync.init({
    server: {
      baseDir: "./" + progect_folder + "/",
    },
    port: 3000,
    notify: false, //отключаем табличку браузер обновился
  });
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html)) //путь куда выгрузиться html
    .pipe(browsersync.stream());
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: `expanded`,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function watchFiles(params) {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
}

function clean(params) {
  return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(css, html));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.html = html;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;
