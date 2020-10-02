import gulp from "gulp";
import del from "del";
import webpack from "webpack-stream";
import routes from "./routes";

export const clearAssets = () => del(routes.js.dest);

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

// export const babelBrowserifyClient = () =>
//   gulp
//     .src(routes.js.src)
//     .pipe(
//       bro({
//         transform: [
//           babelify.configure({ presets: ["@babel/preset-env"] }),
//           ["uglifyify", { global: true }],
//         ],
//       })
//     )
//     .pipe(gulp.dest(routes.js.dest));
