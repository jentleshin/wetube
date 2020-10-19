import passport from "passport";
import GithubStrategy from "passport-github2";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import routes from "./routes";

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_CLIENT_ID,
      clientSecret: process.env.GH_CLIENT_SECRET,
      callbackURL: `http://localhost:3000${routes.ghLoginCallback}`,
      scope: ["user:email"],
    },
    async (_, __, profile, cb) => {
      const {
        emails: [{ value: email }],
        _json: { id: githubId, avatar_url: avatarUrl, login: name },
      } = profile;
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          existingUser.githubId = githubId;
          existingUser.save();
          return cb(null, existingUser);
        }

        const newUser = await User.create({
          name,
          avatarUrl,
          githubId,
          email,
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
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          existingUser.facebookId = facebookId;
          await existingUser.save();
          return done(null, existingUser);
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
