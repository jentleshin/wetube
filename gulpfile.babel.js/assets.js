import gulp from "gulp";
import del from "del";
import webpack from "webpack-stream";
import routes from "./routes";

const startWebpack = (cb) => {
  process.env.WEBPACK_ENV = "development";

  import("../webpack.config.js")
    .then((config) => {
      gulp
        .src(routes.assets.srcMainFile)
        .pipe(webpack(config.default))
        .pipe(gulp.dest(routes.assets.dest));
    })
    .catch((error) => console.log(error));

  cb();
};

const watchAssets = () => {
  gulp.watch(routes.assets.src, startWebpack);
};

export const clearAssets = () => del(routes.assets.dest);
export const prepareAssets = gulp.series([startWebpack]);
export const liveAssets = gulp.series([watchAssets]);
