const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./models/index.js');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//router 분리
const router = require('./routes/main');
app.use('/', router);

//오류처리
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