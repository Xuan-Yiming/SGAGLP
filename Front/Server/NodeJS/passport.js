const { authenticate } = require('passport');
const bcrypt = require('bcrypt');
const { get } = require('http');

const localStrategy = require('passport-local').Strategy;

function initialize(passport, getUserByUsername, getUserByID) {

    const authenticateUser = async (username, password, done) => {
        console.log(username, password)
        const user = getUserByUsername(username)
        if (user == null) {
            return done(null, false, { message: 'No existe el usaurio' })
        }
        console.log(user)
        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("entro")
                return done(null, user)
            } else {
                console.log("no entro")
                return done(null, false, { message: 'Contraseña incorrecta' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new localStrategy({
        usernameField: 'username'
    }, authenticateUser
    ))

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser((id, done) => {
        return done(null, getUserByID(id))
    })
}

module.exports = initialize