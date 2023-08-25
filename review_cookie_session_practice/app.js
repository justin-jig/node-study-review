
import express from "express";
import db from './models/index.js';
import cookiePaser  from 'cookie-parser';
import session  from 'express-session';
import router from './routes/main.js';
import dotenv from 'dotenv';

const app = express();
const PORT = 8000;
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookiePaser());
app.use(session({
    secret: 'mySession',
    resave : false, //세션 데이터가 변경되지 않더라도 세션을 다시 저장할 지 여부
    saveUninitialized : true, //세션 데이터가 초기화되지 않은 상태에서도 세션을 저장할 지 여부
    // 초기화되지 않는 세션데이터? 세션을 시작한 후 데이터를 저장하지 않는 상태
}));

// router 분리
app.use('/', router);

// 오류처리
app.use('*', (req, res) => {
    res.status(404).render('404');
});

// db 싱크
// force:true 항상 테이블 삭제후 재생성
// force:false 테이블이 존재하면 패스 없으면 생성
db.sequelize.sync({
    force:false
}).then(() => {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
})
