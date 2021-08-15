const db = require('./db');
const bcrypt = require('bcrypt');

module.exports = function(app){
    const passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        if(user){
            done(null, user.userId);
        }
    });

    passport.deserializeUser((userId, done) => {
        var userInfo;
        const sqlQuery = 'SELECT * FROM user WHERE userId=?';
        db.query(sqlQuery, [userId], (err, result) => {
            if(err) throw err;
            var json = JSON.stringify(result[0]);
            userInfo = JSON.parse(json);
            done(null, userInfo);
        });
        // console.log('deserializeUser');
        // console.log(userInfo);
    });

    passport.use(new LocalStrategy(
        {
            usernameField: 'id',
            passwordField: 'pwd'
        },
        (username, password, done) => {
            const sqlQuery = 'SELECT * FROM user WHERE id=?';
            db.query(sqlQuery, [username], (err, result) => {
                if(err) throw err;
                if(result.length === 0){ // id X
                    return done(null, false, { message: 'Incorrect ID' });
                } else{ // id O
                    bcrypt.compare(password, result[0].password, (err2, result2) => {
                        if(err2) throw err2;
                        if(result2){ // id O pwd O >>> login sucess
                            var json = JSON.stringify(result[0]);
                            userInfo = JSON.parse(json);
                            done(null, userInfo);
                        } else{ // id O pwd X
                            return done(null, false, { message: 'Incorrect password' });
                        }
                    });
                }
            });
        }
    ));

    return passport;
}
