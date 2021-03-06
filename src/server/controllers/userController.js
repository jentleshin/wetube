import passport from "passport";
import routes from "../routes";
import User from "../models/User";

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
      const targetUserPopulated = await User.findById(targetUserId).populate({
        path: "videos",
        options: { sort: { _id: -1 } },
        populate: { path: "creator", select: { name: 1, avatarUrl: 1 } },
      });
      res.render("userDetail", {
        pageTitle: "User Detail",
        user: targetUserPopulated,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const currentUserDetail = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      throw "currentUser is not defined.";
    }
    const currentUserPopulated = await currentUser
      .populate({
        path: "videos",
        options: { sort: { _id: -1 } },
        populate: { path: "creator", select: { name: 1, avatarUrl: 1 } },
      })
      .execPopulate();

    res.render("userDetail", {
      pageTitle: "User Detail",
      user: currentUserPopulated,
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditProfile = (req, res) => {
  const currentUser = req.user;
  res.render("editProfile", { pageTitle: "Edit Profile", user: currentUser });
};
export const postEditProfile = async (req, res, next) => {
  //change profile
  try {
    const {
      body: { name, email },
      file: { location: avatarUrl },
    } = req;

    if (!avatarUrl && !name && !email) {
      res.redirect(routes.editProfile({ fullRoute: true }));
    } else {
      const currentUser = req.user;
      if (avatarUrl && currentUser.avatarUrl) {
        res.locals.avatarUrl = currentUser.avatarUrl;
      }

      await User.findByIdAndUpdate(currentUser._id, {
        ...(avatarUrl ? { avatarUrl } : {}),
        ...(name ? { name } : {}),
        ...(email ? { email } : {}),
      });
    }

    res.redirect(routes.currentUserDetail({ fullRoute: true }));
    next();
  } catch (error) {
    console.log(error);
    res.redirect(routes.editProfile({ fullRoute: true }));
  }
};
export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword1, newPassword2 },
  } = req;
  const currentUser = req.user;

  try {
    if (newPassword1 !== newPassword2) {
      res.status(400);
      res.redirect(routes.getChangePassword({ fullRoute: true }));
    }
    await currentUser
      .changePassword(oldPassword, newPassword2)
      .catch((error) => {
        res.status(400);
        console.log(error);
        res.redirect(routes.changePassword({ fullRoute: true }));
      });
  } catch (error) {
    console.log(error);
    res.redirect(routes.changePassword({ fullRoute: true }));
  }
  //change password
  res.redirect(routes.currentUserDetail({ fullRoute: true }));
};
