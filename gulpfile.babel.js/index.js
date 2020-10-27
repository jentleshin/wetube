import gulp from "gulp";
import { clearServer, prepareServer, liveServer } from "./server";
import { clearAssets, prepareAssets, liveAssets } from "./assets";
import del from "del";
import routes from "./routes";

const clearAll = () => del(routes.dest);
export const build = gulp.series([clearAll, prepareServer, prepareAssets]);

export const devServer = gulp.series([clearServer, prepareServer, liveServer]);
export const devAssets = gulp.series([clearAssets, prepareAssets, liveAssets]);
