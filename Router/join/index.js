let express=require('express');
let app=express();
let mysql=require('mysql');
const passport = require('passport');
let flash=require('connect-flash');
let LocalStrategy=require('passport-local').Strategy;
let router=express.Router();//라우터 모듈화
let path=require('path');
const { DOUBLE } = require('mysql/lib/protocol/constants/types');
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
        console.log('connecion error');
    }
    else{
        console.log("연결성공");
    } 
});

router.get('/',function(req,res){//클라이언트로 부터 받은 응답값을 ejs를 통해 다시 전송
    let msg;
    let errMsg=req.flash('error');
    if(errMsg)msg=errMsg;
   // console.log("get join url");
    res.render('join.ejs',{'message':msg});
});

passport.serializeUser(function(user,done){
    console.log(user.id);
    done(null,user.id);
})
passport.use('local-join',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true},
    function(req,email,pw,done)
    {
       let query=connectioninfo.query('select * from user where email=?',{email},function(err,row){
        if(err)return done(err);

        if(row.length){
            return done(null,false,{message:'your email is already'})//false이먄 밑에 redirect에 /join으로 다시가는 구문 으로감
        }
        else{
            let sql={email:email,pw:pw};
            let query=connectioninfo.query('insert into user set ?',sql,function(err,row){
                if(err) throw err
                return done(null,{'email':email,'id':id});
            })
        }
       })
    }
));
router.post('/',passport.authenticate('local-join',{
            successRedirect:'/main',
            failureRedirect:'/join',
            failureFlash:true})
)
/* router.post('/',function(req,res){//클라이언트로 부터 받은 응답값을 ejs를 통해 다시 전송
    let body=req.body;
    let email=body.email;
    let id=body.id;
    let password=body.pw;
    
    let query=connectioninfo.query('insert into user(email,id,pw) values("'+email+'","'+id+'","'+password+'")',
    function(err,row){
        if(err) throw err;
        else
        res.render('welcom.ejs',{'name':id,'id':row.insertId});
    })
});
 */
    
module.exports=router;