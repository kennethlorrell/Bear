    /* Packages */

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    sourcemaps = require("gulp-sourcemaps"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    browserSync = require("browser-sync").create(),
    rename = require("gulp-rename"),
    reload = browserSync.reload;


    /* Name Variables */

    var name = {
      jsFile: "main.js",
      cssFile: "styles.css",
      scssFile: "styles.scss",
      libsFile: "libs.js",
      configFile: "_config.scss",
      spriteFile: "_sprite.scss",
      lastAttrFile: "_last-attr.scss"
    };

/* Path variables */

var path = {
  sourcePath: "./app",
  buildPath: "./app",  /* TEMP CORRECTION, CHANGE LATER TO ./dist */
  scssPath: "/sass",
  cssPath: "/css",
  jsPath: "/js",
  imgPath: "/img",
  imgOriginalPath: "/original",
  svgPath: "/svg",
  spritePath: "/sprite",
  jsModulesPath: "/modules",
  libsPath: "/libs",
  blocksPath: "/blocks",
  utilityPath: "/utility",
  fontsPath: "/fonts",
  fontsPattern: "/**/*.{woff,woff2}",
  imgPattern: "/**/*.{jpg,jpeg,png,gif}",
  scssPattern: "/**/*.{scss,sass}",
  svgPattern: "/*.svg",
  _scssPattern: "/**/_*.{scss,sass}",
  _lastAttrPattern: "/" + name.lastAttrFile,
  _configFilePattern: "/" + name.configFile,
  scssFilePattern: "/" + name.scssFile,
  _spriteFilePattern: "/" + name.spriteFile,
  pugPattern: "/**/!(_)*.pug",
  htmlPattern: "/**/!(_)*.html",
  jsPattern: "/**/!(_)*.js",
  levels: ["blocks"]
};


    /* Tasks */

    // Server
gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: "./app"
    },
    notify: false,
    uf: false
  });

  browserSync.watch("./app").on("change", reload);
});

// SCSS to CSS
gulp.task("sass-styles", () => {
  return gulp.src(path.sourcePath + path.scssPath + path.scssPattern, { since: gulp.lastRun("sass-styles")})
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: "expanded"}).on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(path.sourcePath + path.cssPath))
    .pipe(postcss([cssnano({ minifyFontWeight: false })]))
    .pipe(rename({
      suffix: ".min",
      extname: ".css"
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(path.sourcePath + path.cssPath))
    .pipe(reload({ stream: true }));
});

    // Build
gulp.task("build", gulp.series("sass-styles"));

    // Watch changes
gulp.task("watch", () => {
  gulp.watch("./app/sass/*.{scss,sass}", gulp.series("sass-styles"));
  // gulp.watch(path.sourcePath + path.jsPath + path.jsModulesPath + path.jsPattern, gulp.series("js"));
  // gulp.watch(path.sourcePath + path.htmlPattern, gulp.series("html"));
});

    // Build and watch
gulp.task("build:watch", gulp.series("build", gulp.parallel("browser-sync", "watch")));
