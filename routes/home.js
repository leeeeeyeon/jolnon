const express = require('express');
const router = express.Router();

// 파일 분리
const db = require('../lib/db');
const template = require('../lib/template');
const auth = require('../lib/auth');

// 메인 화면
router.get('/', function(request, response){
    var title = '메인 페이지';
    var description = '아 만들기 귀찮다';
    var list = '';
    var html = `
    <!doctype html>
    <html>
    <head>
      <title>JOLNON - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="/home.css" />
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
      <div class="start_page">
      <br />
      <h3>JOLNON, 이렇게 활용하세요!!</h3>
      <br />
      <ul>
      <li> <strong>step 1.</strong> 카테고리별(연도,지도교수,키워드)로 정리된 논문들 한 눈에 훑어보기!!</li>
      <br />
      <li> <strong>step 2.</strong> 키워드별로 연결된 google,dbpia 링크 클릭으로 빠르게 검색결과 확인하기!!</li>
      <br />
      <li> <strong>step 3.</strong> 자주 찾는 논문에 '관심 등록'을 하여 my page에 저장하기!!</li>
      <br />
      <li> <strong>step 4.</strong> 질문게시판에서 졸업논문 관련 질문 해결 및 졸업논문 프로젝트 인원 모집하기!!</li>
      </ul>
      <br /><br />
      </div>
    </body>
    </html>
    `;
    response.send(html);
  });

  module.exports = router;