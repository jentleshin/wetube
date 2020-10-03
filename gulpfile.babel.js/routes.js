const routes = {
  dest: "dest/",
  pug: {
    src: "src/server/views/**/*.pug",
    watch: "src/server/views/**/*.pug",
    dest: "dest/server/views/",
  },
  server: {
    src: "src/server/**/*.js",
    srcWatch: "src/server/**/*.js",

    dest: "dest/server/",
    destWatch: "dest/server/**/*.js",

    initFile: "dest/server/init.js",
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
