import passport from "passport";

// Middleware to authenticate JWT using Passport
export const authenticateJwt = passport.authenticate("jwt", { session: false });
