import gulp from "gulp";
import del from "del";
import nodemon from "gulp-nodemon";
import browserSync from "browser-sync";
import babel from "gulp-babel";
import routes from "./routes";

const pug = () =>
  gulp.src(routes.pug.srcFiles).pipe(gulp.dest(routes.pug.dest));

const babelServer = () =>
  gulp
    .src(routes.server.srcFiles)
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    // .pipe(
    //   babel({
    //     presets: [
    //       [
    //         "@babel/preset-env",
    //         {
    //           useBuiltIns: "usage",
    //           corejs: 3, // or 2,
    //         },
    //       ],
    //     ],
    //   })
    // )
    .pipe(gulp.dest(routes.server.dest));

//bug: restarting multiple times
const startNodemon = (cb) => {
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

const startBrowserSync = (cb) => {
  browserSync.init({
    proxy: "localhost:4000", //with using port:4000, reload multiple times
    files: routes.dest,
  });
  cb();
};

const watchServer = (cb) => {
  gulp.watch(routes.server.srcFiles, babelServer);
  gulp.watch(routes.pug.srcFiles, pug);
  cb();
};

export const clearServer = () => del(routes.server.dest);
export const prepareServer = gulp.series([pug, babelServer]);
export const liveServer = gulp.series([
  startNodemon,
  startBrowserSync,
  watchServer,
]);
