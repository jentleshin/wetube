import gulp, { dest } from "gulp";
import gpug from "gulp-pug";
import del from "del";
import babel from "gulp-babel";
import nodemon from "gulp-nodemon";
import browserSync from "browser-sync";

const routes = {
  dest: "dest/",
  pug: {
    src: "src/pug/**/*.pug",
    dest: "dest/pug/",
  },
  js: {
    src: "src/**/*.js",
    watch: "src/**/*.js",
    dest: "dest/",
    initFile: "dest/server/init.js",
  },
};

const clear = () => del("dest/*");

const pug = () =>
  gulp.src(routes.pug.src).pipe(gpug()).pipe(gulp.dest(routes.pug.dest));

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
  cb();
};

const prepare = gulp.series([clear, pug, babelServer]);
// const server = gulp.series([startNodemon, startBrowserSync]);
const live = gulp.parallel([startNodemon, watch]);

export const dev = gulp.series([prepare, live]);
