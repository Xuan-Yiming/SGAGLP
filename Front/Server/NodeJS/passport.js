const { authenticate } = require("passport");
const { get } = require("http");

const localStrategy = require("passport-local").Strategy;

function initialize(passport, getUserByUsername, getUserByID) {
  const authenticateUser = async (username, password, done) => {
    try {
        const user = await getUserByUsername(username);
      if (user == null) {
        return done(null, false, {
          message: "No existe el usaurio",
        });
      }
      // if (await bcrypt.compare(password, user.password)) {
      if (password === user.password) {
        console.log("entro");
        return done(null, user);
      } else {
        console.log("no entro");
        return done(null, false, { message: "Contraseña incorrecta" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new localStrategy(
      {
        usernameField: "username",
      },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    return done(null, getUserByID(id));
  });
}

module.exports = initialize;
