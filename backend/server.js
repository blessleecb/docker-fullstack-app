//필요한 모듈 가져오기
const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

//Express 서버 생성

const app = express();

//json 형태로 오는 요청의 본문을 해석할 수 있도록 등록
app.use(bodyParser.json());

//DB 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function( requ, res) {
  //DB 에서 모든 정보 가져오기
  db.pool.query('SELECT * FROM lists;',
  (err, results, fileds) => {
    if(err)
    return res.status(500).send(err)
    else
    return res.json(results)
  })
})

//클라이언트에서 입력받은 값을 DB로 보내서 저장
app.post('/api/value', function(req, res, next) => {
  //데이터베이스에 값 넣기
  db.pool.query('INSERT INTO lists (value) VALUES("${req.body.value}")',
    (err, results, fileds) => {
      if(err)
      return res.status(500).send(err)
      else
      return res.json({ success: true, value: req.body.value})
    })
})

app.listen(5000, () => {
  console.log('Application is Running at port 5000')
});
