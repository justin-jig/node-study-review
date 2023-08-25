const Visitor = require('../model/Model');


// 임시데이터
const comments = [
    {
        id : 1,
        userid : 'hello',
        date : '2023-08-05',
        comment : '안녕하세요'
    },
    {
        id : 2,
        userid : 'happy',
        date : '2023-08-09',
        comment : '반갑습니다.'
    },
    {
        id : 3,
        userid : 'lucky',
        date : '2023-08-12',
        comment : '행복하세요.'
    },
    {
        id : 4,
        userid : 'good',
        date : '2023-08-20',
        comment : '좋은 저녁 되세요.'
    },
];

const main = (req, res) =>{
    res.render('index');
}

const getComments = (req, res) => {
    res.render('comments', {lists : comments});
}

const getComment = (req,res) => {
    console.log(req.params);
    // {id:} : id 콜론뒤에 붙은 변수가 key, 입력한 값이 value
    res.render('comment', {data: comments[Number(req.params.id) - 1]});
}

/** 모듈 사용 방법  */
// 방법 1
// module.exports.main = "함수, 변수, 문자열 , 숫자";
// exports.main = null // 위의것의 축약형
// 방법 2
// const test = () => {}
// module.exports = test

module.exports = {
    main,
    getComments,
    getComment
}
