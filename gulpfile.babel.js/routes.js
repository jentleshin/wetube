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
  js: {
    src: "src/assets/js/**/*.js",
    dest: "dest/assets/",
  },
  scss: {
    src: "src/assets/scss/**/*.scss",
    dest: "dest/assets/",
  },
};

export default routes;
