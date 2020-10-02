import gulp from "gulp";
import del from "del";
import webpack from "webpack-stream";
import routes from "./routes";

export const clearAssets = () => del("static/");

export const startWebpack = (cb) => {
  process.env.WEBPACK_ENV = "development";

  import("../webpack.config.js")
    .then((config) => {
      gulp
        .src(routes.js.src)
        .pipe(webpack(config.default))
        .pipe(gulp.dest("static/"));
    })
    .catch((error) => console.log(error));

  cb();
};
