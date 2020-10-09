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

export const getGithubLogin = passport.authenticate("github", {
  scope: ["user:email"],
});
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

export const userDetail = async (req, res) => {
  //if me, go to currentUserDetail
  //else, find get id and find user to render
  const targetUserId = req.params.id;
  const currentUser = req.user;
  try {
    if (currentUser && currentUser._id.equals(targetUserId)) {
      res.redirect(routes.currentUserDetail({ fullRoute: true }));
    } else {
      const targetUser = await User.findById(targetUserId);
      res.render("userDetail", { pageTitle: "User Detail", user: targetUser });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const currentUserDetail = (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      throw "currentUser is not defined.";
    }

    res.render("userDetail", { pageTitle: "User Detail", user: currentUser });
  } catch (error) {
    console.log(error);
    // res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const postEditProfile = (req, res) => {
  //change profile
  res.redirect(routes.me({ fullRoute: true }));
};
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = (req, res) => {
  //change password
  res.redirect(routes.editProfile({ fullRoute: true, id: res.locals.user.id }));
};
