import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import routes from "./routes";
// eslint-disable-next-line
import regeneratorRuntime from "regenerator-runtime";

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      callbackURL: `http://localhost:4000${routes.ghLoginCallback}`,
      scope: "user:email",
    },
    async (_, __, profile, cb) => {
      const {
        _json: { id: githubId, avatar_url: avatarUrl, login: name, email },
      } = profile;
      console.log(_, __, "###", profile.emails);
      try {
        const user = await User.findOne({ email });
        if (user) {
          user.githubId = githubId;
          user.save();
          return cb(null, user);
        } else {
          const newUser = await User.create({
            name,
            avatarUrl,
            githubId,
            email: "jentleshin@gmail.com",
          });
          return cb(null, newUser);
        }
      } catch (error) {
        console.log(error);
        return cb(error);
      }
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
