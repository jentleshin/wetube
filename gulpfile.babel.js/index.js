import gulp from "gulp";
import { clearServer, prepareServer, liveServer } from "./server";
import { clearAssets, prepareAssets, liveAssets } from "./assets";

export const devServer = gulp.series([clearServer, prepareServer, liveServer]);
export const devAssets = gulp.series([clearAssets, prepareAssets, liveAssets]);
