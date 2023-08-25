
const userModel = require('../models/index.model');


// 회원가입 페이지 열기
const get_signup = (req, res) => {

    res.render('signup');

}
// 회원 가입 등록
const post_signup = (req, res) => {
    userModel.db_signup(req.body, () => {
        res.json({result :true})
    })

}
// 로그인 페이지 열기
const get_signin = (req, res) => {

    res.render('signin');
}
// 로그인
const post_signin = (req, res) => {
    userModel.db_signin(req.body, (rows) => {
        if (rows) {
            res.json({result :true, data:rows[0]})
        } else {
            res.json({result :false})
        }
    })
}

const get_user = (req, res) => {

    userModel.db_get_users(req.query, (rows) => {
        res.send({data:rows[0]});
    })
}

const patch_user = (req, res) => {

    userModel.db_get_users(req.body, (result) => {
        if (result) {
            userModel.db_patch_user(req.body, (result) => {
                if (result) {
                    res.json({result : true, user: req.body})
                } else {
                    res.json({result : false, user: {}})
                }
            })
        } else {
            res.json({result : false, user: {}})
        }
    })
}

module.exports = {
    get_user, patch_user,
    get_signup, post_signup,
    get_signin, post_signin
} 