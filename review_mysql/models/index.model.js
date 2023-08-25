const mysql = require('mysql2');


// mysql 연결
// createConnection
// 단일연결
// 요청할때마다 새로운 연결을 생성
// 작은 주의 동시연결이나 단순한 데이터베이스 쿼리일대 사용
// createPool
// 연결 풀을 생성, 풀은 미리 정의된 수의 연결을 생성하고 관리
// 요청이 들어오면 연결 풀에서 사용 가능한 연결을 제공, 작업완료 후 해당 연결 반환
// 연결이 필요하지 않을경우 자동으로 반환, 풀의 연굴 수를 제안하고 관리를 최적화
// 다중연결 서비스에 적합

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'justin',
    password : '',
    database : 'kdtpractice',
    port: 3306,
    connectionLimit: 30,
})


// 문자열 보간방법
//`UPDATE user2 SET userid='${data.userid}', pw='${data.pw}', name='${data.name}' WHERE userid='${data.userid}'`
// 단점 
// 1. sql 인젝션 공격 취약함
// 2. 문자열에특수문자가 포함된 경우 오류가 발생할수도 있음.

// Prepared Statement
// INSERT INTO user (userid,pw, name) VALUE (?,?,?)


// 회원가입 정보 데이터베이스 저장
const db_signup = (data,cb) => {
    // const query = `INSERT INTO user2 (userid, pw, name) VALUES ('${data.userid}','${data.pw}','${data.name}')`;
    // conn.query(query, (err, rows) => {
    //     if (err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log('db_signup', rows)
    //     cb();
    // });

    const query = 'INSERT INTO user (userid, pw, name) VALUE (?,?,?)';
    conn.query(query, [data.userid, data.pw, data.name], (err,rows) => {
        if (err){
            console.log(err);
            return;
        }
        console.log('db_signup', rows)
        cb();
    })

}
// 로그인
const db_signin = (data, cb) => {
    // const query = `SELECT * FROM user2 WHERE userid='${data.userid}'`
    // conn.query(query, (err, rows) => {
    //     if (err){
    //         console.log(err);
    //         return;
    //     }
    //     console.log('db_signin', rows);
    //     cb(rows)
    // });
    const query = 'SELECT * FROM user2 WHERE userid=?';
    conn.query(query, [data.userid ], (err,rows) => {
        if (err){
            console.log(err);
            return;
        }
        console.log('db_signin', rows);
        cb(rows)
    })

}

// get user
const db_get_users = (data, cb) => {
    const query = `SELECT * FROM user2 WHERE userid=?`
    conn.query(query, [data.userid], (err, rows) => {
        if (err){
            console.log(err);
            return;
        }
        console.log('db_get_users', rows);
        cb(rows)
    });

}



const db_patch_user = (data, cb) => {
    const query = `UPDATE user2 SET userid=?, pw=?, name=? WHERE userid=?`
    conn.query(query, [data.userid,data.pw,data.name,data.userid], (err, rows) => {
        if (err){
            console.log(err);
            return;
        }
        console.log('db_patch_user', rows);
        cb(rows)
    });
}

module.exports = {
    db_signup,
    db_signin,
    db_get_users,
    db_patch_user
}
