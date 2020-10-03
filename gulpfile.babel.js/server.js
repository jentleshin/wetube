import gulp from "gulp";
import del from "del";
import nodemon from "gulp-nodemon";
import browserSync from "browser-sync";
import babel from "gulp-babel";
import routes from "./routes";

export const clearServer = () => del(routes.server.dest);

export const pug = () =>
  gulp.src(routes.pug.srcFiles).pipe(gulp.dest(routes.pug.dest));

export const babelServer = () =>
  gulp
    .src(routes.server.srcFiles)
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(gulp.dest(routes.server.dest));

//bug: restarting multiple times
export const startNodemon = (cb) => {
  let started = false;

  const server = nodemon({
    script: routes.server.destMainFile,
    watch: routes.server.destMainFile, //watch for all the imports
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
    files: routes.server.destFiles,
  });
  cb();
};

export const watch = (cb) => {
  gulp.watch(routes.server.srcFiles, babelServer);
  gulp.watch(routes.pug.srcFiles, pug);
  cb();
};
