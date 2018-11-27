module.exports=server=>{
    server.use(handler)
}
async function handler(ctx,next){
    try{
        await next();
    }catch(e){
        console.log(e);
        ctx.body={status:500,err:e,msg:"服务器正在维护中"}
    }  
}