import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
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
      callbackURL: `http://localhost:3000${routes.ghLoginCallback}`,
      scope: "user:email",
    },
    async (_, __, profile, cb) => {
      const {
        _json: { id: githubId, avatar_url: avatarUrl, login: name, email },
      } = profile;
      try {
        //erase soon//
        const githubUser = await User.findOne({ githubId });
        if (githubUser) {
          return cb(null, githubUser);
        }

        const otherUser = await User.findOne({ email });
        if (otherUser) {
          otherUser.githubId = githubId;
          otherUser.save();
          return cb(null, otherUser);
        }

        const newUser = await User.create({
          name,
          avatarUrl,
          githubId,
          email: "jentleshin@gmail.com",
        });
        return cb(null, newUser);
      } catch (error) {
        console.log(error);
        return cb(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      callbackURL: `http://localhost:3000${routes.fbLoginCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (_, __, profile, done) => {
      const {
        _json: {
          id: facebookId,
          name,
          picture: {
            data: { url: avatarUrl },
          },
          email,
        },
      } = profile;
      try {
        const user = await User.findOne({ email });
        if (user) {
          user.facebookId = facebookId;
          await user.save();
          return done(null, user);
        }
        const newUser = await User.create({
          name,
          avatarUrl,
          email,
          facebookId,
        });
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
