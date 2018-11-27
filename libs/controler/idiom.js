const request=require('request');
const getUrl=require('../getUrl');
const JSDOM=require('jsdom').JSDOM;
const iconv=require('iconv-lite');
const gbk=require('gbk');
function postRequest(url,form){
    return new Promise((resolve,reject)=>{
        request.post(url, {form},(err,response,body)=>{
            if(!err){
                resolve(body)
            }else{
                reject(err)
            }
        })
    })
}
function getRequest(url){
    return new Promise((resolve,reject)=>{
        request(url,(err,response,body)=>{
            if(!err){
                resolve(body)
            }else{
                reject(err)
            }
        })
    })
}

class Idiom{
    constructor(){

    }
    async getIdiomExp(idiom,index){   
        try{
            let body=await postRequest('https://chengyu.911cha.com/',{q:idiom});
            let DOM=new JSDOM(body);
            let document=DOM.window.document;
            let explain=document.querySelectorAll('table.f14 tr')[1].querySelector('td').innerHTML;
            explain=explain.slice(explain.indexOf('/a>')+5);
            console.log(explain)
            return explain;
        }catch(err){
            return err
        }  
    }
    async getNearIdiom(pos,word){
        console.log(pos,word)
        let rawStr=iconv.encode(word,"gbk").toString();
        let query=`q${Number(pos)+1}=${encodeURI(rawStr)}`;
        let api=`http://chengyu.t086.com/chaxun.php?${query}`
        let body=await getUrl(api);
        let html=gbk.toString('utf-8',body);
        let DOM=new JSDOM(html);
        let document=DOM.window.document;
    
        let oH=document.querySelectorAll('.td1');
        if(oH){
            let arr=[];
            for(let i=0;i<oH.length;i++){
                oH[i].innerHTML=oH[i].innerHTML.replace(/<\/?.+?>/g,"");
                arr.push(oH[i].innerHTML); 
            }
            console.log(arr)
            return arr;
        }else{
            return [];
        }
        
     }
}


module.exports=new Idiom();

