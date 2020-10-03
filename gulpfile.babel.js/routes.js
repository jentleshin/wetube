const routes = {
  dest: "dest/",
  pug: {
    srcFiles: "src/server/views/**/*.pug",
    dest: "dest/server/views/",
  },
  server: {
    srcFiles: "src/server/**/*.js",

    dest: "dest/server/",
    destFiles: "dest/server/**/*.js",

    destMainFile: "dest/server/init.js",
  },
  assets: {
    src: "src/assets/js/**/*.js",
    srcMainFile: "src/assets/js/main.js",
    dest: "dest/assets/",
  },
};

export default routes;
