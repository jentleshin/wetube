import passport from "passport";
import routes from "../routes";
import User from "../models/User";
// eslint-disable-next-line
import regeneratorRuntime from "regenerator-runtime";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    //Todo: register user
    //Todo: login User
    try {
      const user = new User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log in" });

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const getGithubLogin = passport.authenticate("github");
export const getGithubLoginCallback = passport.authenticate("github", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const getFacebookLogin = passport.authenticate("facebook", {
  scope: "email",
});
export const getFacebookLoginCallback = passport.authenticate("facebook", {
  successRedirect: routes.home,
  failureRedirect: routes.login,
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = (req, res) => {
  //change profile
  res.redirect(routes.userDetail({ fullRoute: true, id: res.locals.user.id }));
};
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = (req, res) => {
  //change password
  res.redirect(routes.editProfile({ fullRoute: true, id: res.locals.user.id }));
};
