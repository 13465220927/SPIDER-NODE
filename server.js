const Koa=require('koa');

const staticCache=require('koa-static-cache');
const body=require('koa-better-body');
const convert=require('koa-convert');
const error=require('./libs/error_handle');
const session=require('koa-session');
const config=require('./config');
const Router=require('koa-router');
const ejs=require('koa-ejs');
const pathLib=require('path');

let server=new Koa();
server.listen(config.port)

//错误处理
error(server)

//POST
server.use(convert(body({
    uploadDir:config.uploadDir
})));

//session
server.keys=config.secret_key;
server.use(session({

},server))

//ejs
ejs(server,{
    root:pathLib.resolve('./template'),
    layout:false,
    viewExt:".ejs.html",
    cache:false,
    debug:false
})
//router
let mainRouter=new Router();
mainRouter.use('/idiom/',require('./routers/index'));

server.use(mainRouter.routes());
server.use(staticCache(config.wwwDir));
