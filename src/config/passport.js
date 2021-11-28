const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

module.exports = function (passport) {
	// requerido para sesiones de inicio de sesión persistentes
	// el pasaporte necesita la capacidad de serializar y anular la serialización de los usuarios fuera de sesión
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});
	// used to deserialize user
	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
	// login
	passport.use(
		'local-signup',
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true, // allows us to pass back the entire request to the callback
			},
			function (req, email, password, done) {
				User.findOne({ 'local.email': email }, function (err, user) {
					if (err) {
						return done(err);
					}
					if (user) {
						return done(
							null,
							false,
							req.flash(
								'signupMessage',
								'El correo ya existe en la base de datos'
							)
						);
					} else {
						var newUser = new User();
						newUser.local.email = email;
						newUser.local.password = newUser.generatehash(password);
						newUser.save(function (err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			}
		)
	);
	passport.use(
		'local-login',
		new LocalStrategy(
			{
				// by default, local strategy uses username and password, we will override with email
				usernameField: 'email',
				passwordField: 'password',
				passReqToCallback: true, // allows us to pass back the entire request to the callback
			},
			function (req, email, password, done) {
				User.findOne({ 'local.email': email }, function (err, user) {
					if (err) {
						return done(err);
					}
					if (!user) {
						return done(
							null,
							false,
							req.flash('loginMessage', 'El usuario no ha sido encontrado')
						);
					}
					if (!user.validPassword(password)) {
						return done(
							null,
							false,
							req.flash('loginMessage', 'contraseña incorrecta')
						);
					}
					return done(null, user);
				});
			}
		)
	);
};
