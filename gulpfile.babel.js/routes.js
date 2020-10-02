const routes = {
  dest: "dest/",
  pug: {
    src: "src/views/**/*.pug",
    watch: "src/views/**/*.pug",
    dest: "dest/views/",
  },
  server: {
    src: ["src/**/*.js", "!src/assets/**/*.js"],
    srcWatch: ["src/**/*.js", "!src/assets/**/*.js"],

    dest: "dest/",
    destWatch: ["dest/**/*.js", "!dest/assets/**/*.js"],

    initFile: "dest/init.js",
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
