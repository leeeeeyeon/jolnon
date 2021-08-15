const express = require('express');
const app = express();

// middleware
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const flash = require('connect-flash');

// use middleware
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));
app.use(helmet());
app.use(session({
    httpOnly: true,
    secret: 'qwertyasdfg',
    resave: false,
    saveUninitialized: true,
    store: new fileStore()
}));
app.use(flash());

const passport = require('./lib/passport')(app);

// router 
const homeRouter = require('./routes/home');
const boardRouter = require('./routes/board');
const userRouter = require('./routes/user')(passport);
const mypageRouter = require('./routes/mypage');
const jolnonRouter = require('./routes/jolnon');

// use router
app.use('/', homeRouter);
app.use('/board', boardRouter);
app.use('/user', userRouter);
app.use('/mypage', mypageRouter);
app.use('/jolnon', jolnonRouter);

// 오류 처리
app.use(function(req, res, next){
    res.status(404).send('404 - Sorry cannot find that!');
 });

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).send('500 - Something broke!');
});

app.listen(3000);

// const PORT = process.env.PORT;
// app.listen(PORT);