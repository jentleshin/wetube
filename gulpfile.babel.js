import gulp from "gulp";
import del from "del";
import babel from "gulp-babel";
import nodemon from "gulp-nodemon";
import gpug from "gulp-pug";
import browserSync from "browser-sync";

const routes = {
  dest: "dest/",
  pug: {
    src: "src/views/**/*.pug",
    watch: "src/views/**/*.pug",
    dest: "dest/views/",
  },
  js: {
    src: "src/**/*.js",
    watch: "src/**/*.js",
    dest: "dest/",
    initFile: "dest/init.js",
  },
};

const clear = () => del("dest/*");

const pug = () => gulp.src(routes.pug.src).pipe(gulp.dest(routes.pug.dest));

const babelServer = () =>
  gulp
    .src(routes.js.src)
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulp.dest(routes.js.dest));

const startNodemon = (cb) => {
  let started = false;
  nodemon({
    script: routes.js.initFile,
    watch: routes.js.initFile,
  }).on("start", () => {
    if (!started) {
      cb();
      started = true;
    }
  });
};

// const startBrowserSync = (cb) => {
//   browserSync.init({
//     port: 4000,
//     files: dest,
//   });
//   cb();
// };

const watch = (cb) => {
  gulp.watch(routes.js.watch, babelServer);
  gulp.watch(routes.pug.watch, pug);
  cb();
};

const prepare = gulp.series([clear, pug, babelServer]);
// const server = gulp.series([startNodemon, startBrowserSync]);
const live = gulp.parallel([startNodemon, watch]);

export const dev = gulp.series([prepare, live]);
