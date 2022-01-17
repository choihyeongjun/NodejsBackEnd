let express=require('express');
let app=express();
let router=express.Router();//라우터 모듈화
let path=require('path');
let main=require('./main/main');
let email=require('./email/email');
let join=require('./join/index');
router.get('/',function(req,res){
    console.log("index.js");
    res.sendFile(path.join(__dirname,'../public/main.html'));
});
router.use('/main',main);//라우팅 모듈화한거 app.js에서 선언 /main시 main 변수선언한 경로로 이동
router.use('/email',email);
router.use('/join',join);
module.exports=router;