const express = require('express');
const app = express();
const path = require('path'); //manejar rutas y dirreciones metodo path
const mongoose = require('mongoose'); //me permitira conectarme a mongodb
const passport = require('passport'); //configurar la manera en que me voy a autenticar
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database');
mongoose.connect(url, {
	/* useMongoClient: true, */
});
require('./config/passport')(passport);
//settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); //configurar motor de plantiila

//middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
// required for passport
app.use(
	session({
		secret: 'andresdavila',
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//routes
require('./app/routes')(app, passport);
//static files
app.use(express.static(path.join(__dirname, 'public')));
app.listen(app.get('port'), () => {
	console.log('server funcionando en el puerto:', app.get('port'));
});
