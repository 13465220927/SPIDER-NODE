const Router=require('koa-router');
let router=new Router();
let config=require('../config');
let Idiom=require('../libs/controler/idiom');
const zlib=require('zlib');

//获得一个成语的解释
router.post('getExplain',async ctx=>{    
    let {idiom}=ctx.request.fields;
    let explain=await Idiom.getIdiomExp(idiom);
    
    console.log(explain)
    ctx.body={status:200,data:{idiom,explain}}
})

//获得一个字的
router.post('getNearIdiom',async ctx=>{
    let {pos,word}=ctx.request.fields;
    console.log(pos)
    let arr=await Idiom.getNearIdiom(pos,word);
    ctx.body={status:200,data:{arr}};
})



module.exports=router.routes();