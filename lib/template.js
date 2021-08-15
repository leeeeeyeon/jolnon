const sanitizeHtml = require('sanitize-html');

module.exports = {
  HTML:function(title, list, body, control,
    authStatusUI='<a href="/user/login">login</a> | <a href="/user/register">register</a>', category){
    return `
    <!doctype html>
    <html>
    <head>
      <title>JOLNON - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" type="text/css" href="/board.css" />
    </head>
    <body>
      ${authStatusUI}
      <h1><a href="/">JOLNON</a></h1>
      ${category}
      <br>
      ${control}
      ${list}
      ${body}
    </body>
    </html>
    `;
  }

  ,list:function(board){ // 게시글 리스트
    var list = `
    <table class="tbl">
      <thead>
      <tr>
      <th>제목</th>
      <th>작성 일자</th>
      </tr>
      </thead>
      <tbody>
    `;
    var i = 0;
    while(i < board.length){
      list += `
      <tr>
      <td class="title"><a href="/board/${board[i].postId}">${sanitizeHtml(board[i].title)}</a></td>
      <td class="date">${board[i].created}</td>
      </tr>
      `;
      i = i + 1;
    }
    list += '</tbody></table>';
    return list;
  }

  , thesisList:function(thesis){
    var list = `
    <table class="tbl">
      <thead>
      <tr>
      <th>번호</th>
      <th>제목</th>
      <th>키워드</th>
      <th>지도교수님</th>
      <th>작성연도</th>
      <th>관심</th>
      </tr>
      </thead>
      <tbody>
    `;
    
    var i = 0;
    while(i < thesis.length){
      list += `
      <tr>
      <td class="num">${thesis[i].thesisNum}</td>
      <td class="title">${thesis[i].title}</td>
      <td class="keyword">${thesis[i].keyword}</td>
      <td class="professor">${thesis[i].professor}</td>
      <td class="year">${thesis[i].year}</td>
      <td class="btn">
      <form action="/jolnon/create" method="post">
        <input type="hidden" name="thesisNum" value=${thesis[i].thesisNum}>
        <input type="submit" value="관심 논문 저장" />
        <button><a href="https://www.google.com/search?q=${thesis[i].keyword}">구글</a></button>
        <button><a href="https://www.dbpia.co.kr/search/topSearch?startCount=0&collection=ALL&range=A&searchField=ALL&sort=RANK&query=${thesis[i].keyword}&srchOption=*&includeAr=false&searchOption=*">DBpia</a></button>
      </form>
      </td>
      </tr>
      `;
      i = i + 1;
    }
    list += '</tbody></table>';
    return list;
  }
  
}