const express = require('express');
const router = express.Router();

const sanitizeHtml = require('sanitize-html');
const shortid = require('shortid');

// 파일 분리
const db = require('../lib/db');
const template = require('../lib/template');
const auth = require('../lib/auth');

// 글 목록
router.get('/', function(request, response){
  page = 0;
  db.query('SELECT * FROM board ORDER BY created', function(error, board){
    if(error) throw error;
    var title = 'Board';
    var list = template.list(board);
    var html = `
    <!doctype html>
    <html>
    <head>
      <title>JOLNON - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="/board.css" />
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
        <a href="/board" class="on">질문게시판</a>
      </div>
      <br>
      <div class="menu">
        <a href="/board/create" class="on">글작성</a>
      </div>
      ${list}
    </body>
    </html>
    `;
    response.send(html);
  });
});

// 게시글 생성
router.get('/create', function(request, response){
  if(!auth.isLogin(request, response)){
    response.redirect('/');
    return false;
  }
  db.query(`SELECT * FROM board ORDER BY created`, function(error, board){
    var title = 'Create';
    var html = `
    <!doctype html>
    <html>
    <head>
      <title>JOLNON - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="/create.css" />
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
        <a href="/board" class="on">질문게시판</a>
      </div>
      <br>
      <div class="board_wrap">
      <div class="board_title">
      <strong>글 작성</strong>
      </div>
      <div class="board_write_wrap">
        <form action="/board/create_process" method="post">
          <div class="board_write">
            <div class="title">
              <dl>
                <dt>제목</dt>
                <dd><input type="text" name="title" placeholder="제목 입력" /></dd>
              </dl>
            </div>

            <div class="cont">
              <textarea name="description" placeholder="내용 입력"></textarea>
            </div>
          </div>
          <div class="bt_wrap">
            <input type="submit" class="on" value="등록"></input>
            <a href="/board">취소</a>
          </div>
        </form>
      </div>
      </div>
    </body>
    </html>
    `;
    response.send(html);
  });
});

router.post('/create_process', function(request, response){
    if(!auth.isLogin(request, response)){
        response.redirect('/');
        return false;
    }
    var post = request.body;
    var title = post.title;
    var description = post.description;
    var postId = shortid.generate();

    let now = new Date();
    let timeString = now.toLocaleString();
    
    var content = {
      postId: postId,
      title: title,
      description: description,
      created: timeString,
      userId: request.user.userId
    };
    db.query(`
      INSERT INTO board SET ?`,
        content,
        function(error, result){
          if(error) throw error;
          response.redirect(`/board/${postId}`);
        }
        );
});

// 게시글 수정
router.get('/update/:pageId', function(request, response){
  if(!auth.isLogin(request, response)){
    response.redirect('/');
    return false;
  }
  db.query(`SELECT * FROM board ORDER BY created`, function(error, board){
    if(error) throw error;
    db.query(`SELECT * FROM board WHERE postId=?`, [request.params.pageId], function(error2, content){
      if(error2) throw error2;
      var title = 'Update';
      var list = template.list(board);
      var html = `
      <!doctype html>
      <html>
      <head>
        <title>JOLNON - ${title}</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="/create.css" />
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
          <a href="/board" class="on">질문게시판</a>
        </div>
        <div class="board_write_wrap">
        <div class="board_title">
        <strong>글 수정</strong>
        </div>
        <form action="/board/create_process" method="post">
          <div class="board_write">
            <div class="title">
              <dl>
                <dt>제목</dt>
                <dd><input type="text" name="title" vaule="${sanitizeHtml(content[0].title)}" placeholder="제목 입력" /></dd>
              </dl>
            </div>

            <div class="cont">
              <textarea name="description" placeholder="내용 입력">${sanitizeHtml(content[0].description)}</textarea>
            </div>
          </div>
          <div class="bt_wrap">
            <input type="submit" class="on" value="수정"></input>
            <a href="/board">취소</a>
          </div>
        </form>
      </div>
      </div>
      </body>
      </html>
      `;
      response.send(html);
    });
  });
});

router.post('/update_process', function(request, response){
  if(!auth.isLogin(request, response)){
    response.redirect('/');
    return false;
  }
    var post = request.body;
    var postId = post.postId;
    var title = post.title;
    var description = post.description;
    var userId = request.user.userId; // 로그인한 사람의 아이디
    
    db.query(`SELECT * FROM board left join user on board.userId=user.userId WHERE title=?`,
    [title], function(error, board){
      if(error) throw error;
      if(userId !== board[0].userId){
        request.flash('error', 'You cannot edit it!');
        return response.redirect('/');
      } else{
          console.log(post);
          db.query(`UPDATE board SET title=?, description=? WHERE postId=?`,
          [title, description, postId],
          function(error, result){
            if(error) throw error;
            response.redirect(`/board/${postId}`);
          });
      }
    });
});

// 게시글 삭제
router.post('/delete_process', function(request,response){
    if(!auth.isLogin(request, response)){
      response.redirect('/');
      return false;
    }
    var post = request.body;
    var id = post.id;
    var count = request.user.count; // 로그인 한 사용자
    db.query(`SELECT * FROM board left join user on board.userId=user.userId WHERE postId=?`,
    [id], function(error, board){
      if(error) throw error;
      if(count !== board[0].user_id){
        request.flash('error', 'You cannot delete it!');
        return response.redirect('/board');
      } else{
          db.query(`DELETE FROM board WHERE postId=?`, [id], function(error, result){
            if(error){
              throw error;
            }
            response.redirect('/');
          });
      }
    });
});

router.post('/comment', function(request, response){
  if(!auth.isLogin(request, response)){
    response.redirect('/');
    return false;
  }
  var comment = request.body;
  console.log(comment);
  db.query(`INSERT INTO comment SET ?`,
  comment, (err, result)=>{
    if(err) throw err;
    response.redirect(`/board/${comment.postId}`);
  }); 
});

// 상세글
router.get('/:pageId', function(request, response){
    db.query(`SELECT * FROM board ORDER BY created`, function(error, board){
      if(error) throw error;
      db.query(`SELECT * FROM board left join user on board.userId=user.userId WHERE board.postId=?`,
      [request.params.pageId], function(error2, content){
        if(error2) throw error2;
        var title = content[0].title;
        var description = content[0].description;
        var nickname = content[0].nickname;
        var html = `
        <!doctype html>
        <html>
        <head>
          <title>JOLNON - ${title}</title>
          <meta charset="utf-8">
          <link rel="stylesheet" href="/create.css" />
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
            <a href="/board" class="on">질문게시판</a>
          </div>
          <div class="menu">
          <a href="/board/update/${request.params.pageId}" class="on">글수정</a>
          <br><br>
          <form action="/board/delete_process>
          <input type="hidden" name="id" value="${request.params.pageId}" />
          <input type="submit" value="글삭제" class="on"/>
          </form>
          </div>
          <br>
          <div class="board_write_wrap">
            <div class="board_write">
              <div class="title">
                <dl>
                  <dt>제목</dt>
                  <dd>${title}</dd>
                </dl>
              </div>
  
              <div class="title">
                <dt>본문</dt>
                <dd>${description}</dd>
              </div>
            </div>
        </div>
        </div>
          <h4>댓글창</h4>
          <form action="/board/comment" method="post">
          <input type="hidden" name="postId" value="${request.params.pageId}">
          <input type="hidden" name="userId" value="${content[0].userId}">
          <p><input type="textarea" name="text" placeholder="댓글을 입력해주세요"></p>
          <input type="submit" value="댓글 작성">
          </form>
        </body>
        </html>
        `;

        response.send(html);
      });
    });
});

module.exports = router;