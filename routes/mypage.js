const express = require('express');
const router = express.Router();

// 파일 분리
const db = require('../lib/db');
const template = require('../lib/template');
const auth = require('../lib/auth');

router.get('/jolnon', (request,response)=>{
    var title = '관심 논문';
    db.query('SELECT * FROM likeThesis LEFT JOIN thesis on likeThesis.thesisNum=thesis.thesisNum WHERE userId=?',
    [request.user.userId], (err, result)=>{
        var title = '관심 논문';

        var list = '<table>';
        var i = 0;
        while(i < result.length){
          list += `
          <tr>
          <td>- ${result[i].title} | ${result[i].keyword} | ${result[i].professor} | ${result[i].year}</td>
          <td>
          <form action="/mypage/delete" method="post">
          <input type="hidden" name="thesisNum" value="${result[i].thesisNum}">
          <button><a href="https://www.google.com/search?q=${result[i].keyword}">구글</a></button>
          <button><a href="https://www.dbpia.co.kr/search/topSearch?startCount=0&collection=ALL&range=A&searchField=ALL&sort=RANK&query=${result[i].keyword}&srchOption=*&includeAr=false&searchOption=*">DBpia</a></button>
          <input type="submit" value="삭제">
          </form>
          </td>
          </tr>`;
          i = i + 1;
        }
        list += '</table>';

        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" type="text/css" href="/mypage.css" />
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
            <a href="/jolnon/professor">교수님별</a>
            <a href="/board">질문게시판</a>
          </div>
          <br><br>
          <div class="profile">
            <h3>${request.user.nickname}님의 마이페이지</h3>
            <p>id: ${request.user.id}</p>
            <input type="submit" value="회원정보 수정">
            <input type="submit" value="회원탈퇴">
            <br><br>
          </div>
          <br>
          <div class="interest">
            <div class="category">
                <a href="/mypage/jolnon">관심 논문</a>
                |
                <a href="/mypage/keyword">관심 키워드</a>
                |
                <a href="/mypage/professor">관심 교수님</a>
            </div>
            <br>
            ${list}
          </div>
        </body>
        </html>
        `;
        response.send(html);
    });
});

router.get('/keyword', (request,response)=>{
  db.query('SELECT * FROM likeThesis LEFT JOIN thesis on likeThesis.thesisNum=thesis.thesisNum WHERE userId=?',
  [request.user.userId], (err, result)=>{
      if(err) throw err;
      var title = '관심 키워드';

      var list = '<table>';
      var i = 0;
      while(i < result.length){
        list += `
        <tr>
        <td>- ${result[i].keyword}</td>
        <td>
        <form action="/mypage/delete" method="post">
        <input type="hidden" name="thesisNum" value="${result[i].thesisNum}">
        <button><a href="https://www.google.com/search?q=${result[i].keyword}">구글</a></button>
        <button><a href="https://www.dbpia.co.kr/search/topSearch?startCount=0&collection=ALL&range=A&searchField=ALL&sort=RANK&query=${result[i].keyword}&srchOption=*&includeAr=false&searchOption=*">DBpia</a></button>
        <input type="submit" value="삭제">
        </form>
        </td>
        </tr>`;
        i = i + 1;
      }
      list += '</table>';

      var html = `
      <!doctype html>
      <html>
      <head>
        <title>JOLNON - ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="/mypage.css" />
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
          <a href="/jolnon/professor">교수님별</a>
          <a href="/board">질문게시판</a>
        </div>
        <br><br>
        <div class="profile">
          <h3>${request.user.nickname}님의 마이페이지</h3>
          <p>id: ${request.user.id}</p>
          <input type="submit" value="회원정보 수정">
          <input type="submit" value="회원탈퇴">
          <br><br>
        </div>
        <br>
        <div class="interest">
          <div class="category">
              <a href="/mypage/jolnon">관심 논문</a>
              |
              <a href="/mypage/keyword">관심 키워드</a>
              |
              <a href="/mypage/professor">관심 교수님</a>
          </div>
          <br>
          ${list}
        </div>
      </body>
      </html>
      `;
      response.send(html);
  });
});

router.get('/professor', (request,response)=>{
  db.query('SELECT * FROM likeThesis LEFT JOIN thesis on likeThesis.thesisNum=thesis.thesisNum WHERE userId=?',
  [request.user.userId], (err, result)=>{
      var title = '관심 교수님';

      var list = '<table>';
      var i = 0;
      while(i < result.length){
        list += `
        <tr>
        <td>- ${result[i].professor}</td>
        <td>
        <form action="/mypage/delete" method="post">
        <input type="hidden" name="thesisNum" value="${result[i].thesisNum}">
        <input type="submit" value="삭제">
        </form>
        </td>
        </tr>`;
        i = i + 1;
      }
      list += '</table>';

      var html = `
      <!doctype html>
      <html>
      <head>
        <title>JOLNON - ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" type="text/css" href="/mypage.css" />
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
          <a href="/jolnon/professor">교수님별</a>
          <a href="/board">질문게시판</a>
        </div>
        <br><br>
        <div class="profile">
          <h3>${request.user.nickname}님의 마이페이지</h3>
          <p>id: ${request.user.id}</p>
          <input type="submit" value="회원정보 수정">
          <input type="submit" value="회원탈퇴">
          <br><br>
        </div>
        <br>
        <div class="interest">
          <div class="category">
              <a href="/mypage/jolnon">관심 논문</a>
              |
              <a href="/mypage/keyword">관심 키워드</a>
              |
              <a href="/mypage/professor">관심 교수님</a>
          </div>
          <br>
          ${list}
        </div>
      </body>
      </html>
      `;
      response.send(html);
  });
});
router.post('/delete', (request, response)=>{
    var thesisNum = request.body.thesisNum;
    var id = request.user.id;
    var userId = request.user.userId;
    db.query('DELETE FROM likethesis WHERE thesisNum=? AND userId=?',
    [thesisNum, userId], (err)=>{
        if(err) throw err;
        response.redirect(`/mypage/${id}`);
    });
});

router.get('/:id', (request, response)=>{
    db.query('SELECT * FROM user WHERE id=?',
    [request.params.id] ,(err, result)=>{
        if(err) throw err;
        const user = result[0];
        var title = 'My page';
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" type="text/css" href="/mypage.css" />
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
          <a href="/jolnon/professor">교수님별</a>
          <a href="/board">질문 게시판</a>
        </div>
        <br><br>
        <div class="profile">
            <h3>${user.nickname}님의 마이페이지</h3>
            <p>id: ${user.id}</p>
            <input type="submit" value="회원정보 수정">
            <input type="submit" value="회원탈퇴">
            <br><br>
        </div>
        <br>
        <div class="interest">
            <div class="category">
                <a href="/mypage/jolnon">관심 논문</a>
                |
                <a href="/mypage/keyword">관심 키워드</a>
                |
                <a href="/mypage/professor">관심 교수님</a>
            </div>
        </div>
        </body>
        </html>
        `;

        response.send(html);
    });
});

  module.exports = router;