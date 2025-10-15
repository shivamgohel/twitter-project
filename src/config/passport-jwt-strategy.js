import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user";
import dotenv from "dotenv";

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(options, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);

      if (user) {
        return done(null, user); // user found, attach to req.user
      } else {
        return done(null, false); // no user found
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
