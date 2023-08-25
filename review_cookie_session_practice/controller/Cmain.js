import crypto from 'crypto';
import  db from '../models/index.js'
const User = db.User;
// 쿠키 설정
const cookieConfig = {
   
}

////////////////////////////////
//GET
//메인페이지
const main = (req, res) => {
    res.render('index');
};

//GET
//유저리스트 페이지
const userList = (req, res) => {
    // 쿠키 사용

    if (req.session.userinfo) {
        User.findAll().then((result) => {
            let user = {};
            for (let i = 0; i < result.length; i++) {
                if (result[i].dataValues.id === Number(req.session.userinfo)) {
                    user.name = result[i].dataValues.name;
                }
            }
            console.log('user',user)
            res.render('userList', {users : result, user: user});
        })
    
    } else {
        res.redirect('/');
    }
};
//회원가입페이지
const signup = (req, res) => {
    // 쿠키생성
    // res.cookie(쿠키이름, 쿠키값, 옵션객체)
    if (req.session.userinfo) {
        res.redirect('/');
    } else {
        res.render('signup');
    }
};
//로그인페이지
const signin = (req, res) => {

    if (req.session.userinfo) {
        res.redirect('/');
    } else {
        res.render('signin');
    }
 
};
//회원정보 조회 페이지
const profile = (req, res) => {
    console.log(req.params);
    console.log(req.query);
    // findOne : 데이터베이스에서 하나의 정보를 찾을 때 사용, 객체변화
    // where는 객체형태로 찾을 정보를 입력

    if (req.session.userinfo) {
        User.findOne({
            where: { id: req.session.userinfo },
        }).then((result) => {
            res.render('profile', { data: result });
        })
    } else {
        res.redirect('/');
    }
};
const buy = (req, res) => {};

///////////////////////////////
//POST
//회원가입
const post_signup = (req, res) => {
    
    // 실습과제 : 비밀번호 암호화
    const { userid, name, pw } = req.body;

    //salt 생성
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.pbkdf2Sync(pw, salt, Number(process.env.iterations), 
                                                Number(process.env.keylen), process.env.digest).toString('base64');
    User.create({
        userid, name, pw:hash, salt 
    }).then(() => {
        res.json({ result: true });
    })
   

};
//로그인
const post_signin = (req, res) => {

    // 실습과제 : 로그인
    // step1 아이드를 찾아서 사용자 존재 유/무 체크
    // step2 입력한 비밀번호 암호화하여 기존 데이터와 비교

    User.findOne({
        where: { userid: req.body.userid },
    }).then((result) => {
   
        if (result) {
            const { dataValues } = result;
            const compare = crypto.pbkdf2Sync(req.body.pw, dataValues.salt,
                                                Number(process.env.iterations), 
                                                Number(process.env.keylen), process.env.digest);
            const compareResult =  crypto.timingSafeEqual(compare, Buffer.from(dataValues.pw,'base64'));
            if (compareResult) {
                req.session.userinfo = dataValues.id;
                res.cookie('token',{id : req.body.id} ,cookieConfig);
                res.cookie('id', dataValues.id ,cookieConfig);
                console.log(req.session);
                res.json({result:true, data: {id: dataValues.id, name :dataValues.name}})    
            } else {
                res.json({result:false})
            }
        } else {
            res.json({result:false})
        }
    })

};
/////////////////////////////////////////
//PATCH
const edit_profile = (req, res) => {

    // update (수정할 정보를 객체형태로입력, 수정할 곳 객체 입력)
    const {name, pw:reqpw, id} = req.body;
    let updateObj ={name};

    if (reqpw != '') {
        const salt = crypto.randomBytes(16).toString('base64');
        const pw = crypto.pbkdf2Sync(reqpw, salt, Number(process.env.iterations), 
                                                     Number(process.env.keylen), process.env.digest).toString('base64');
        updateObj.pw = pw;
        updateObj.salt = salt;
    }   
   
    User.update(updateObj, {
        where : {id}
    }).then((result) => {
        if (result) {
            res.json({result:true});
        } else {
            res.json({result:false});
        }   
    })
};


const destroy = (req, res) => {

    const {id} = req.body;
    User.destroy({
        where : {id}
    }).then((result) => {
        if (result) {
            res.json({result:true});
        } else {
            res.json({result:false});
        }   
    })
}

const logout = (req, res) => {

    delete req.session.userinfo;
    console.log('req.session',req.session)
    if (!req.session.userinfo) {
        res.json({result:true});
    } else {
        res.json({result:false});
    }   
}



export default {
    main,
    signup,
    signin,
    profile,
    buy,
    post_signup,
    post_signin,
    edit_profile,
    destroy,
    userList,
    logout
}
