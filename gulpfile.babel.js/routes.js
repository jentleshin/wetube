const routes = {
  dest: "dest/",
  pug: {
    // src:
    srcFiles: "src/server/views/**/*.pug",
    // srcMainFile:
    dest: "dest/server/views/",
    // destFiles:
    //destMainFIle:
  },
  server: {
    // src:
    srcFiles: "src/server/**/*.js",
    // srcMainFile:
    dest: "dest/server/",
    destFiles: "dest/server/**/*.js",
    destMainFile: "dest/server/init.js",
  },
  assets: {
    // src:
    // srcFiles:
    srcMainFile: "src/assets/js/main.js",
    dest: "dest/assets/",
    // destFiles:
    //destMainFIle:
  },
};

export default routes;
