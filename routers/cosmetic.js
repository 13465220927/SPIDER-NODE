const Router=require('koa-router');
let router=new Router();
let config=require('../config');
let Cosmetic=require('../libs/controler/cosmetic');
const zlib=require('zlib');

router.get('getKind',async ctx=>{    
    let kind=await Cosmetic.getKind();
    console.log(kind)
    ctx.body={status:200,data:{kind}}
})
router.get('getProductList',async ctx=>{
    let {category,p}=ctx.query;
    let kind=await Cosmetic.getProductList(category,p);
    ctx.body={status:200,data:{kind}}
});
router.get('getComposition',async ctx=>{
    let {mid}=ctx.query;
    let data=await Cosmetic.getProductComposition(mid)
    ctx.body={status:200,data:data};
})



module.exports=router.routes();