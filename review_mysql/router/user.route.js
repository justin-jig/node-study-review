
const controller = require('../controller/user.crtl.js');

const userRoute = (router) => {

    return (
        router.get('/user/signup', controller.get_signup), // 회원가입 페이지 열기
        router.post('/user/signup', controller.post_signup), // 회원가입 등록
        router.get('/user/signin', controller.get_signin), // 로그인 페이지 열기
        router.post('/user/signin', controller.post_signin), // 로그인
        // 회원정보수정 기능
        // 회원정보조회 => GET
        // 회원정보 수정 => PATCH

        //GET 조회 방식일때는 url을 qurey string 또는 파라미터 방식으로 지정
        //query string방식은 페이지 이동을 안하며 파라미터는 페이지를 이동(res.render)

        router.get('/user/getUser', controller.get_user),
        router.patch('/user/update', controller.patch_user)
    )
}


module.exports = userRoute