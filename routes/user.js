const express = require('express');
const router = express.Router();

const shortid = require('shortid');
const bcrypt = require('bcrypt');

// 파일 분리
const db = require('../lib/db.js');
const template = require('../lib/template.js');

module.exports = function(passport){
    router.get('/login', function(request, response){
      var fmsg = request.flash();
      var feedback = '';
      if(fmsg.error){
        feedback = fmsg.error[0];
      }
      var title = 'Login';
      var html = `
      <!doctype html>
      <html>
      <head>
        <title>JOLNON - ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/login.css" />
      </head>
      <body>
        <div class="up">
          <header>
              <div class="login">
              <a href="/user/login">login</a> | <a href="/user/register">register</a>
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
        <br><br>
        <div style="color:red;">${feedback}</div>
        <form action="/user/login_process" method="post">
          <div class="area">
          <input type="text" name="id" id="id" autocomplete="off" required />
          <label for="id">아이디</label>
          </div>
          <div class="area">
          <input
            type="password"
            name="pwd"
            id="pwd"
            autocomplete="off"
            required
          />
          <label for="pw">비밀번호</label>
          </div>
          <div class="area2">
            <input type="submit" value="로그인">
          </div>
        </form>
        <br>
      </body>
      </html>
      `;
      response.send(html);
    });

    router.post('/login_process',
        passport.authenticate('local', {
            failureRedirect: '/user/login',
            failureFlash: true 
        }), function(request, response){
            request.session.save(function(err){
              response.redirect('/');
            }
            );
        }
    );

    router.get('/register', function(request, response){
      var fmsg = request.flash();
      var feedback = '';
      if(fmsg.error){
        console.log(fmsg.error);
        feedback = fmsg.error[0];
      }
      var title = 'Register';
      var html = `
      <!doctype html>
      <html>
      <head>
        <title>JOLNON - ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/login.css" />
      </head>
      <body>
        <div class="up">
          <header>
              <div class="login">
              <a href="/user/login">login</a> | <a href="/user/register">register</a>
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
        <br><br>
        <div style="color:red;">${feedback}</div>
        <form action="/user/register_process" method="post">
          <div class="area">
          <input type="text" name="id" id="id" autocomplete="off" required />
          <label for="id">아이디</label>
          </div>
          <div class="area">
          <input type="text" name="nickname" id="nickname" autocomplete="off" required />
          <label for="nickname">닉네임</label>
          </div>
          <div class="area">
          <input
            type="password"
            name="pwd"
            id="pwd"
            autocomplete="off"
            required
          />
          <label for="pw">비밀번호</label>
          </div>
          <div class="area">
          <input
            type="password"
            name="pwd2"
            id="pwd2"
            autocomplete="off"
            required
          />
          <label for="pw">비밀번호 재확인</label>
          </div>
          <div class="area2">
            <input type="submit" value="회원가입">
          </div>
        </form>
        <br>
      </body>
      </html>
      `;
      
      response.send(html);
    });

    router.post('/register_process', function(request, response){
      var post = request.body;
      var id = post.id;
      var pwd = post.pwd;
      var pwd2 = post.pwd2;
      var nickname = post.nickname;
      
      if(pwd !== pwd2){
        request.flash('error', 'Password must be same!');
        response.redirect('/user/register');
      } else{
        bcrypt.hash(pwd, 10, (err, hash)=>{
          if(err) throw err;
          var user = {
          userId: shortid.generate(),
          id: id,
          password: hash,
          nickname: nickname
          };
          db.query(`
          INSERT INTO user SET ?`, user, function(error, result){
            if(error) throw error;
          }
          );
          request.login(user, function(err){
            return response.redirect(`/`);
          });
        });
      }
    });

    router.get('/logout', function(request, response){
        request.logout();
        request.session.destroy(function(err){
          response.redirect('/');
        });
    });

    return router;
}