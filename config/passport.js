import passportJwt from 'passport-jwt';

import Account from '../models/Account';

const JwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

module.exports = passport => {
  let opts = {};
  opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.MY_DATABASE_SECRET;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Account.findById(jwt_payload._id, (err, account) => {
      if (err)
        return done(err, false);

      if (account)
        return done(null, account);
      else
        return done(null, false);
    });
  }));
};
