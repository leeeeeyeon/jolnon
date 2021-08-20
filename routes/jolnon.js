const express = require('express');
const router = express.Router();

// 파일 분리
const db = require('../lib/db');
const template = require('../lib/template');
const auth = require('../lib/auth');

// 연도별
router.get('/year', (request, response)=>{
    db.query('SELECT * FROM thesis ORDER BY year DESC LIMIT 10 OFFSET 0', (err, thesis)=>{
        if(err) throw err;
        var title = 'By year';
        var list = template.thesisList(thesis);
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/year.css" />
        </head>
        <body>
          <div class="up">
            <header>
                <div class="login">
                ${auth.statusUI(request, response)}
                </div>
            </header>
          </div>
          <div class="t">
          <h1>
          <a
          href="https://ice.inha.ac.kr/ice/2270/subview.do"
          target="_blank"
          ><img
            src="/images/logo.png"
            alt="인하대"
            width="40"
            height="40"
          /></a>
  
          <a href="/">JOLNON</a>
         </h1>
          </div>

          <div class="bar">
            <a href="/jolnon/year" class="on">연도별</a>
            <a href="/jolnon/keyword">키워드별</a>
            <a href="/jolnon/professor">교수님별</a>
            <a href="/board">질문게시판</a>
          </div>
          <div class="menu">
          <br>
            <a href="/jolnon/year" class="on">ALL</a>
            <a href="/jolnon/year/2021">2021</a>
            <a href="/jolnon/year/2020">2020</a>
            <a href="/jolnon/year/2019">2019</a>
            <a href="/jolnon/year/2018">2018</a>
            <a href="/jolnon/year/2017">2017</a>
            <a href="/jolnon/year/2016">2016</a>
          </div>
          <br>
          ${list}
        </body>
        </html>
        `;
        response.send(html);
    });
});

router.get('/year/:year', (request, response)=>{
    db.query('SELECT * FROM thesis WHERE year=?',
    [parseInt(request.params.year)], (err, result)=>{
        if(err) throw err;
        var title = request.params.year;
        var list = template.thesisList(result);
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/year.css" />
        </head>
        <body>
          <div class="up">
            <header>
                <div class="login">
                ${auth.statusUI(request, response)}
                </div>
            </header>
          </div>
          <div class="t">
          <h1>
          <a
          href="https://ice.inha.ac.kr/ice/2270/subview.do"
          target="_blank"
          ><img
            src="/images/logo.png"
            alt="인하대"
            width="40"
            height="40"
          /></a>
  
          <a href="/">JOLNON</a>
         </h1>
          </div>

          <div class="bar">
            <a href="/jolnon/year" class="on">연도별</a>
            <a href="/jolnon/keyword">키워드별</a>
            <a href="/jolnon/professor">교수님별</a>
            <a href="/board">질문게시판</a>
          </div>
          <div class="menu">
          <br>
            <a href="/jolnon/year">ALL</a>
            <a href="/jolnon/year/2021">2021</a>
            <a href="/jolnon/year/2020">2020</a>
            <a href="/jolnon/year/2019">2019</a>
            <a href="/jolnon/year/2018">2018</a>
            <a href="/jolnon/year/2017">2017</a>
            <a href="/jolnon/year/2016">2016</a>
          </div>
          <br>
          ${list}
        </body>
        </html>
        `;

        response.send(html);
    });
});

// 교수님별
router.get('/professor', (request, response)=>{
    db.query('SELECT * FROM thesis ORDER BY year DESC', (err, thesis)=>{
        if(err) throw err;
        var title = 'By professor';
        var list = template.thesisList(thesis);
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/year.css" />
        </head>
        <body>
          <div class="up">
            <header>
                <div class="login">
                ${auth.statusUI(request, response)}
                </div>
            </header>
          </div>
          <div class="t">
          <h1>
          <a
          href="https://ice.inha.ac.kr/ice/2270/subview.do"
          target="_blank"
          ><img
            src="/images/logo.png"
            alt="인하대"
            width="40"
            height="40"
          /></a>
  
          <a href="/">JOLNON</a>
         </h1>
          </div>

          <div class="bar">
            <a href="/jolnon/year">연도별</a>
            <a href="/jolnon/keyword">키워드별</a>
            <a href="/jolnon/professor" class="on">교수님별</a>
            <a href="/board">질문게시판</a>
          </div>
          <div class="menu">
          <br>
          <br />
          <a href="/jolnon/professor">ALL</a>
          <a href="/jolnon/professor/김기창교수님">김기창교수님</a>
          <a href="/jolnon/professor/김덕경교수님">김덕경교수님</a>
          <a href="/jolnon/professor/김유성교수님">김유성교수님</a>
          <a href="/jolnon/professor/김춘우교수님">김춘우교수님</a>
          <a href="/jolnon/professor/김학일교수님">김학일교수님</a>
          <br />
          <a href="/jolnon/professor/박대영교수님">박대영교수님</a>
          <a href="/jolnon/professor/박인규교수님">박인규교수님</a>
          <a href="/jolnon/professor/박재현교수님">박재현교수님</a>
          <a href="/jolnon/professor/박재형교수님">박재형교수님</a>
          <a href="/jolnon/professor/변경수교수님">변경수교수님</a>
          <br />
          <a href="/jolnon/professor/서영교교수님">서영교교수님</a>
          <a href="/jolnon/professor/오범환교수님">오범환교수님</a>
          <a href="/jolnon/professor/유상조교수님">유상조교수님</a>
          <a href="/jolnon/professor/이승걸교수님">이승걸교수님</a>
          <a href="/jolnon/professor/이종호교수님">이종호교수님</a>
          <br />
          <a href="/jolnon/professor/이채은교수님">이채은교수님</a>
          <a href="/jolnon/professor/이한호교수님">이한호교수님</a>
          <a href="/jolnon/professor/최원익교수님">최원익교수님</a>
          <a href="/jolnon/professor/최학남교수님">최학남교수님</a>
          <a href="/jolnon/professor/홍성은교수님">홍성은교수님</a>
          <br />
          </div>
          <br>
          ${list}
        </body>
        </html>
        `;
        response.send(html);
    });
});

router.get('/professor/:professor', (request, response)=>{
    db.query('SELECT * FROM thesis WHERE professor=?',
    [request.params.professor], (err, result)=>{
        if(err) throw err;
        var title = request.params.professor;
        var list = template.thesisList(result);
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/year.css" />
        </head>
        <body>
          <div class="up">
            <header>
                <div class="login">
                ${auth.statusUI(request, response)}
                </div>
            </header>
          </div>
          <div class="t">
          <h1>
          <a
          href="https://ice.inha.ac.kr/ice/2270/subview.do"
          target="_blank"
          ><img
            src="/images/logo.png"
            alt="인하대"
            width="40"
            height="40"
          /></a>
  
          <a href="/">JOLNON</a>
         </h1>
          </div>

          <div class="bar">
            <a href="/jolnon/year">연도별</a>
            <a href="/jolnon/keyword">키워드별</a>
            <a href="/jolnon/professor" class="on">교수님별</a>
            <a href="/board">질문게시판</a>
          </div>
          <div class="menu">
          <br>
          <br />
          <a href="/jolnon/professor">ALL</a>
          <a href="/jolnon/professor/김기창교수님">김기창교수님</a>
          <a href="/jolnon/professor/김덕경교수님">김덕경교수님</a>
          <a href="/jolnon/professor/김유성교수님">김유성교수님</a>
          <a href="/jolnon/professor/김춘우교수님">김춘우교수님</a>
          <a href="/jolnon/professor/김학일교수님">김학일교수님</a>
          <br />
          <a href="/jolnon/professor/박대영교수님">박대영교수님</a>
          <a href="/jolnon/professor/박인규교수님">박인규교수님</a>
          <a href="/jolnon/professor/박재현교수님">박재현교수님</a>
          <a href="/jolnon/professor/박재형교수님">박재형교수님</a>
          <a href="/jolnon/professor/변경수교수님">변경수교수님</a>
          <br />
          <a href="/jolnon/professor/서영교교수님">서영교교수님</a>
          <a href="/jolnon/professor/오범환교수님">오범환교수님</a>
          <a href="/jolnon/professor/유상조교수님">유상조교수님</a>
          <a href="/jolnon/professor/이승걸교수님">이승걸교수님</a>
          <a href="/jolnon/professor/이종호교수님">이종호교수님</a>
          <br />
          <a href="/jolnon/professor/이채은교수님">이채은교수님</a>
          <a href="/jolnon/professor/이한호교수님">이한호교수님</a>
          <a href="/jolnon/professor/최원익교수님">최원익교수님</a>
          <a href="/jolnon/professor/최학남교수님">최학남교수님</a>
          <a href="/jolnon/professor/홍성은교수님">홍성은교수님</a>
          <br />
          </div>
          <br>
          ${list}
        </body>
        </html>
        `;

        response.send(html);
    });
});

// 키워드별
router.get('/keyword', (request, response)=>{
    db.query('SELECT * FROM thesis ORDER BY year DESC', (err, thesis)=>{
        if(err) throw err;
        var title = 'By keyword';
        var list = template.thesisList(thesis);
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/year.css" />
        </head>
        <body>
          <div class="up">
            <header>
                <div class="login">
                ${auth.statusUI(request, response)}
                </div>
            </header>
          </div>
          <div class="t">
          <h1>
          <a
          href="https://ice.inha.ac.kr/ice/2270/subview.do"
          target="_blank"
          ><img
            src="/images/logo.png"
            alt="인하대"
            width="40"
            height="40"
          /></a>
  
          <a href="/">JOLNON</a>
         </h1>
          </div>

          <div class="bar">
            <a href="/jolnon/year">연도별</a>
            <a href="/jolnon/keyword" class="on">키워드별</a>
            <a href="/jolnon/professor">교수님별</a>
            <a href="/board">질문게시판</a>
          </div>
          <div class="menu">
          <br>
          <a href="/jolnon/keyword" class="on">ALL</a>
          <a href="/jolnon/keyword/머신러닝">머신러닝</a>
          <a href="/jolnon/keyword/딥러닝">딥러닝</a>
          <a href="/jolnon/keyword/Vivado HLS">Vivado HLS</a>
          <a href="/jolnon/keyword/자율주행">자율주행</a>
          <a href="/jolnon/keyword/네트워크">네트워크</a>
          <a href="/jolnon/keyword/RAM">RAM</a>
          <a href="/jolnon/keyword/CNN">CNN</a>
          <a href="/jolnon/keyword/Q-Learning">Q-Learning</a>
          <a href="/jolnon/keyword/영상처리">영상처리</a>
          <a href="/jolnon/keyword/통신">통신</a>
          <a href="/jolnon/keyword/사물인터넷">사물인터넷</a>
          <a href="/jolnon/keyword/기타">기타</a>
          </div>
          <br>
          ${list}
        </body>
        </html>
        `;
        response.send(html);
    });
});

router.get('/keyword/:keyword', (request, response)=>{
    var keyword = request.params.keyword+'\r';
    db.query('SELECT * FROM thesis WHERE keyword=?',
    [keyword], (err, result)=>{
        if(err) throw err;
        var title = request.params.keyword;
        var list = template.thesisList(result);
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/year.css" />
        </head>
        <body>
          <div class="up">
            <header>
                <div class="login">
                ${auth.statusUI(request, response)}
                </div>
            </header>
          </div>
          <div class="t">
          <h1>
          <a
          href="https://ice.inha.ac.kr/ice/2270/subview.do"
          target="_blank"
          ><img
            src="/images/logo.png"
            alt="인하대"
            width="40"
            height="40"
          /></a>
  
          <a href="/">JOLNON</a>
         </h1>
          </div>

          <div class="bar">
            <a href="/jolnon/year">연도별</a>
            <a href="/jolnon/keyword" class="on">키워드별</a>
            <a href="/jolnon/professor">교수님별</a>
            <a href="/board">질문게시판</a>
          </div>
          <div class="menu">
          <br>
          <a href="/jolnon/keyword">ALL</a>
          <a href="/jolnon/keyword/머신러닝">머신러닝</a>
          <a href="/jolnon/keyword/딥러닝">딥러닝</a>
          <a href="/jolnon/keyword/Vivado HLS">Vivado HLS</a>
          <a href="/jolnon/keyword/자율주행">자율주행</a>
          <a href="/jolnon/keyword/네트워크">네트워크</a>
          <a href="/jolnon/keyword/RAM">RAM</a>
          <a href="/jolnon/keyword/CNN">CNN</a>
          <a href="/jolnon/keyword/Q-Learning">Q-Learning</a>
          <a href="/jolnon/keyword/영상처리">영상처리</a>
          <a href="/jolnon/keyword/통신">통신</a>
          <a href="/jolnon/keyword/사물인터넷">사물인터넷</a>
          <a href="/jolnon/keyword/기타">기타</a>
          </div>
          <br>
          ${list}
        </body>
        </html>
        `;
        response.send(html);
    });
});

// 관심 논문 등록
router.post('/create', (request, response)=>{
    if(!auth.isLogin(request,response)){
        response.redirect('/jolnon/year');
        return false;
    }
    var thesisNum = request.body.thesisNum;
    var userId = request.user.userId;
    
    db.query(`INSERT INTO likeThesis (thesisNum, userId)
        VALUES(?,?)`, [thesisNum, userId], (err, result)=>{
            if(err) throw err;
            response.redirect('/');
        });
});

  module.exports = router;