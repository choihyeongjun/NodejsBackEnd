let express=require('express');
let router=require('./Router/index');
let app=express();
let passport=require('passport');
let LocalStrategy=require('passport-local').Strategy;
let session=require('express-session');
let flash=require('connect-flash');
//let bodyParser=require('body-parser');//post 방식의 값을 받아오기위해 express 에서 json 형태의 값
const bodyParser = require('body-parser');
const Connection = require('mysql/lib/Connection');
app.listen(3000,function(){
console.log("start!! express server on port! 3000");
});
app.set('view engins','ejs');
app.use(bodyParser.json());//bodyparser 사용해준다는 표시 json 형태와 그냥 인코딩상태 둘다 선언
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));//public 밑의 static 경로 자동적으로 지정

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())//메세지 쉽게 전달
app.use(router);
//url routing
/*app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/main.html"); //dirnameexpress에 있는 절대경로 
});
*/


