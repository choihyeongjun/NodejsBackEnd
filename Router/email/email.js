let express=require('express');
let app=express();
let mysql=require('mysql');
let router=express.Router();//라우터 모듈화
let path=require('path');
//db 셋팅
let connectioninfo=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3306,
    password:'1234',
    database:'user',
 
});
connectioninfo.connect(function(err){//nodemon 안되서 실행할려면 npx nodemon app.js하면됨
    if(err){
        console.log('connecion error??');
    }
    else{
        console.log("연결성공");
    } 
});

router.post('/form',function(req,res){//클라이언트로 부터 받은 응답값을 ejs를 통해 다시 전송
    //get : req.param('email')
    //console.log(req.body);
    //res.send("post response");
   
    res.send("<h1>welcome "+req.body.email+ "</h1>");
    res.render('email.ejs',{'email' : req.body.email});//ejs 사용하기 위해 view engine,ejs로 보내기위해 render
    //템플릿과 함께 값
});

router.post('/ajax',function(req,res){
    console.log(req.body.email);
    //check validation about input value
    //let responseData={'result':'ok','email':req.body.email};
   // res.json(responseData);
    let email=req.body.email;
    let responseData={};
    let query=connectioninfo.query('select * from user where email="'+email+'"',function(err,rows){
        if(err)throw err;

        if(rows[0]){
           responseData.result="ok";
           responseData.id=rows[0].id;
         }
         else{ 
            responseData.result="none";
            responseData.id="";
         }
         res.json(responseData);
    });
});
module.exports=router;