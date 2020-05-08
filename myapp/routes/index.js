var express = require('express');
var router = express.Router();
var dbConn = require('../dbConnect/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//hiên thi danh sách
router.get('/list', (req, res) => {
  let sql = "SELECT * FROM nhanvien";
  let query = dbConn.query(sql, (err, users) => {
    if (err) throw err;
    res.render('list', {
      users: users
    });
  });
});
// hiện thị form add
router.get('/add', function (req, res, next) {
  res.render('add', { title: 'Nam' });
});
//thêm nhân viên
router.post('/create', (req, res) => {
  let name = req.body.hoten;
  let email = req.body.email;
  let password = req.body.password;
  let data = { ten: name, email: email, password: password };
  let sql = "INSERT INTO nhanvien SET ?";
  let query = dbConn.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect('/');
    console.log('Create success.');
  });
});
//hiện thi form edit
router.get('/edit/(:id)', (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM nhanvien where id = " +id;
  let query = dbConn.query(sql, (err, users) => {
    if (err) throw err;
    res.render('edit', {
      users: users,
      
    });
  });
});
router.post('/update/:id', (req, res) => {
  let id = req.params.id;
  let name = req.body.hoten;
  let email = req.body.email;
  let password = req.body.password;
  let data ={ten:name,email:email,password:password};
  let sql = "update nhanvien set ? where id = " +id;
  let query = dbConn.query(sql,data, (err, users) => {
    if (err) throw err;
    res.redirect('/list');
  });
});
//xóa
router.get('/delete/:id',(req, res) => {
  let id =req.params.id;
  let sql = "delete from nhanvien where id = "+id;
  let query = dbConn.query(sql, (err, users) => {
    if(err) throw err;
    console.log('delete');
    res.redirect('/list');
  });
});
module.exports = router;
