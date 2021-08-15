module.exports = {
    isLogin: function(request, response){ // 로그인 여부 확인
        if(request.user){
            return true;
        } else{
            return false;
        }
    },
    statusUI: function(request, response){
        var authStatusUI = '<a href="/user/login">login</a> | <a href="/user/register">register</a>';
        if(this.isLogin(request, response)){
            authStatusUI = `${request.user.nickname} |
             <a href="/mypage/${request.user.id}">My page</a> |
             <a href="/user/logout">logout</a>`;
        }

        return authStatusUI;
    }
}