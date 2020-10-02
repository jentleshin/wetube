import gulp from "gulp";
import {
  clearServer,
  pug,
  babelServer,
  startNodemon,
  startBrowserSync,
  watch,
} from "./server";
import { clearAssets, startWebpack } from "./assets";

const prepare = gulp.series([clearServer, pug, babelServer]);
const server = gulp.series([startNodemon, startBrowserSync]);
const live = gulp.series([server, watch]);

export const devServer = gulp.series([prepare, live]);

export const devAssets = gulp.series([clearAssets, startWebpack]);
