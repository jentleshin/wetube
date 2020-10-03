import routes from "../routes";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = (req, res) => {
  const {
    body: { password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    //Todo: register user
    //Todo: login User
    res.redirect(routes.home);
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log in" });
export const postLogin = (req, res) => {
  //Todo: Confirm login
  // eslint-disable-next-line
  if (false) {
    res.status(400);
    res.render("login", { pageTitle: "Log in" });
  } else {
    //ToDo: Login User
    res.redirect(routes.home);
  }
};
export const logout = (req, res) => {
  //logout user
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
