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

class Cosmetic{
    constructor(){

    }
    async getKind(idiom,index){   
       // https://www.bevol.cn/product?v=2.0&category=13&p=2
        try{
            let body=await getRequest('https://www.bevol.cn/product');
            let DOM=new JSDOM(body);
            let document=DOM.window.document;
            let a=document.querySelectorAll('.goods-main-box a');
            let arr=Array.from(a).map(item=>{
                return {category_name:item.innerHTML,category:item.getAttribute('data-id')};
            })
            console.log(arr);
            return arr;
           
        }catch(err){
            return err
        }  
    }
    async getProductList(category,p){
        try{
            let api=`https://www.bevol.cn/product?category=${category}&p=${p}`;
            console.log(api)
            let body=await getRequest(api);
            let DOM=new JSDOM(body);
            let document=DOM.window.document;
            let content=document.querySelector('.page-content');
            console.log(body);
            let list=content.querySelectorAll('a');
            // let arr=Array.from(list).map(item=>{
            //     return {category_name:item.innerHTML,category:item.getAttribute('data-id')};
            // })
            console.log(list[0].innerHTML);
            return [];
           
        }catch(err){
            return err
        }  
    }
    async getProductComposition(mid){
        let api=`https://www.bevol.cn/product/${mid}.html`;
        console.log(api)
        let body=await getRequest(api);
        let DOM=new JSDOM(body);
        let document=DOM.window.document;
        let aInfo=document.querySelectorAll('.cosmetics-info-box');
        let obj={};
        let overview=aInfo[0].querySelectorAll('.xiangjing a');
        let overview2=aInfo[1].querySelectorAll('.xiangjing a');
        let table=document.querySelector('.chengfenbiao table');
        let aTr=table.querySelectorAll('tr');
        console.log(overview[0].innerHTML)

        obj.xiangjing=overview[0]?overview[0].innerHTML:"";
        obj.fangfu=overview[1]?overview[1].innerHTML:'';
        obj.fenxian=overview[2]?overview[2].innerHTML:"";
        obj.yunfu=overview[3]?overview[3].innerHTML:"";
        obj.gongxiao=overview2[0]?overview2[0].innerHTML:"";
        obj.qingjie=overview2[1]?overview2[1].innerHTML:"";
        obj.anji=overview2[2]?overview2[2].innerHTML:"";
        obj.sls=overview2[3]?overview2[3].innerHTML:"";
        obj.composition=[];
        for(let i=1;i<aTr.length;i++){
            console.log(aTr[i].innerHTML)
            let aTd=aTr[i].querySelectorAll('td');
            obj.composition.push({
                mingcheng:aTd[0].querySelector('a')?aTd[0].querySelector('a').innerHTML.replace(/\n/g," "):"",
                fengxian:aTd[1].querySelector('span')?aTd[1].querySelector('span').innerHTML.replace(/\n/g," "):"",
                huoxing:aTd[2].querySelectorAll('img').length,
                zhiai:aTd[3].querySelectorAll('img').length,
                mudi:aTd[4]?aTd[4].innerHTML.replace(/\n/g," "):""
            })
        }
     
       
        

        return obj;
    }
}


module.exports=new Cosmetic();
