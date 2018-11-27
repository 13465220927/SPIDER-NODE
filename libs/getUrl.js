const url=require('url');
async function getUrl(sUrl,){
    let data=await _req(sUrl);
    return data;   
};
function _req(sUrl){
    return new Promise((resolve,reject)=>{
        let obj=url.parse(sUrl);
        let mod=null;
        if(obj.protocol=='http:'){
            mod=require('http');
        }else{
            mod=require('https');
        }
        let req=mod.request({
            hostname:obj.hostname,
            path:obj.path
        },res=>{
            if(res.statusCode==200){
                let arr=[];
                res.on('data',buffer=>{
                    arr.push(buffer);
                });
                res.on('end',()=>{
                    let b=Buffer.concat(arr);
                    //数据已经接收完了；
                    resolve(b);
                })
            }else if(res.statusCode==301||res.statusCode==302){
                _req(res.headers['location'])
            }else{
                console.log('出错了',res.statusCode)
                rejectr(res.statusCode)
            }
        });
        req.on('error',err=>{
            console.log('出错了',err)
            reject(err)
        });
        req.end();
    })
   
}


module.exports=getUrl;