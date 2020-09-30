import routes from "./routers/routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    name: "haha123",
    id: "123123",
  };
  next();
};
