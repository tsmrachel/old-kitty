
var gulp = require("gulp");
var browserify = require("browserify");
var del = require("del");

var plugins = require("gulp-load-plugins")();

//  gulp.task('styles', function() {
//   return plugins.rubySass('./app/css/main.scss', { compass: true, style : 'expanded' })
//   .pipe(gulp.dest('dist/css/'))
//   .pipe(plugins.connect.reload());
// });

gulp.task("styles", function() {
  return plugins.rubySass("./app/css/**/*.scss", {
    compass: true, style: "expanded"
  })
    .pipe(gulp.dest("dist/css/"))
    .pipe(plugins.connect.reload());
});

gulp.task("templates", function() {
  return gulp.src([
    "app/js/components/jsx/navbarComponent.jsx",
    "app/js/components/jsx/expense/*.jsx",
    "app/js/components/jsx/ledger/*.jsx",
    "app/js/components/jsx/appRedux.jsx",
    "app/js/components/jsx/router.jsx"])
    .pipe(plugins.concat("components.js"))
    .pipe(plugins.babel({
      plugins: ["transform-react-jsx"]
    }))
    .pipe(gulp.dest("app/js/components/js"))
    .pipe(plugins.connect.reload());
});

gulp.task("js", ["templates"], function() {
  return gulp.src(["main.js",
    //  order matters!
    "app/js/lib/jquery-3.1.0.slim.js",
    "app/js/lib/react.js",
    "app/js/lib/react-dom.js",
    "app/js/lib/redux.js",
    "app/js/lib/react-redux.js",
    "app/js/lib/ReactRouter.min.js",
    "app/js/common/utils.js",
    "app/js/components/js/*.js",
    "app/js/common/router.js",
    "app/js/components/lib/materialize.js"])
    .pipe(plugins.concat("main.js"))
    .pipe(plugins.rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("dist/js/"))
    .pipe(plugins.connect.reload());
});

gulp.task("html", function() {
  return gulp.src("app/index.html")
    .pipe(plugins.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("dist"))
    .pipe(plugins.connect.reload());
});

gulp.task("fonts", function() {
  return gulp.src("app/fonts/**/*")
    .pipe(gulp.dest("dist/fonts/"))
    .pipe(plugins.connect.reload());
});

gulp.task("images", function() {
  return gulp.src("app/images/*")
    .pipe(gulp.dest("dist/images/"))
    .pipe(plugins.connect.reload());
});

gulp.task("clean", function() {

  return del(["dist/**", "app/js/components/js/*"], function(err, deletedFiles) {
    console.log("Files Deleted", deletedFiles.join(", "));
  });
});

gulp.task("default", ["clean"], function() {

  return gulp.start("fonts", "images", "templates", "styles", "js", "html", "connect", "watch");
});

gulp.task("connect", function() {
  plugins.connect.server({
    basePath: "./",
    root: "dist",
    port: "1324",
    livereload: true
  });
});

gulp.task("watch", ["connect"], function() {

  // Watch .scss files

  gulp.watch("app/css/**/*.scss", ["styles"]);

  // Watch .jsx files

  gulp.watch("app/js/components/jsx/*.jsx", ["templates"]);

  // Watch .js files

  gulp.watch("app/js/**/*.js", ["js"]);

  // Watch .html file

  gulp.watch("app/index.html", ["html"]);

});


gulp.task("ftest", function() {
  return gulp.src("ftest/wdio.conf.js").pipe(plugins.webdriver());
});

