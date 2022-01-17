let express=require('express');
let app=express();
let router=express.Router();//라우터 모듈화
let path=require('path');
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../public/main.html'));
});
module.exports=router;