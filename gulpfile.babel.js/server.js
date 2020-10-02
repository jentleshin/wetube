import gulp from "gulp";
import del from "del";
import nodemon from "gulp-nodemon";
import browserSync from "browser-sync";
import babel from "gulp-babel";
import routes from "./routes";

export const clearServer = () => del(routes.server.destWatch);

export const pug = () =>
  gulp.src(routes.pug.src).pipe(gulp.dest(routes.pug.dest));

export const babelServer = () =>
  gulp
    .src(routes.server.src)
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulp.dest(routes.server.dest));

//bug: restarting multiple times
export const startNodemon = (cb) => {
  let started = false;

  const server = nodemon({
    script: routes.server.initFile,
    watch: routes.server.initFile, //watch for all the imports
    stdout: false,
  });

  server.on("stdout", (stdout) => {
    process.stdout.write(stdout);
    if (!started) {
      cb();
      started = true;
    }
  });
};

export const startBrowserSync = (cb) => {
  browserSync.init({
    proxy: "localhost:4000", //with using port:4000, reload multiple times
    files: routes.server.destWatch,
  });
  cb();
};

export const watch = (cb) => {
  gulp.watch(routes.server.srcWatch, babelServer);
  gulp.watch(routes.pug.watch, pug);
  cb();
};
