

var leiarray=null;
var game=$(".game");
var tabledate=[];
// 用于存储地图每个格子额外的数据
var falgarray=[];
var btns=$$(".level>button");
var leinumber=$(".leinum");
function initlei(){
    var arr=new Array(curlevel.row*curlevel.col);

    for(var i =0;i<arr.length;i++){
        arr[i]=i;

    }
// 打乱数组
arr.sort(()=>0.5-Math.random());

    return arr.slice(0,curlevel.leinyum);
    
}
 
function clearscence(){
    game.innerHTML="";
    falgarray=[];
    $(".qinum").innerHTML=0;
    leinumber.innerHTML=curlevel.leinyum;
}

function init(){
    clearscence();
leiarray =initlei();
// console.log(leiarray);
// 2。生成表格
var table =document.createElement("table");
var index=0;
for(var i=0;i<curlevel.row;i++){
    var tr=document.createElement("tr");
    tabledate[i]=[];
    for(var j=0;j<curlevel.col;j++){
      var td=document.createElement("td") ;
      var div=document.createElement("div");
      tabledate[i][j]={
        row:i,
        col:j,
        type:"number",
        value:0,
        index,
        checked:false,
      };
      div.dataset.id=index;
      div.classList.add("canflag");
// 查看当前格子的下标是否在雷的数组里面
      if(leiarray.includes(tabledate[i][j].index)){
            tabledate[i][j].type="lei";
            div.classList.add("lei");
      }
      td.appendChild(div);
    tr.appendChild(td);
          index++}
      table.appendChild(tr);
}
game.appendChild(table);
game.onmousedown=function(e){
    if(e.button===0){
       searchArea(e.target)
    }
    if (e.button===2){
        flag(e.target)
    }
};

}




function showanswer(){
         var isallright=true;
       var leiarr=$$("td>div.lei");
       for(i=0;i<leiarr.length;i++){
        leiarr[i].style.opacity=1;
       }
       for(var i=0;i<falgarray.length;i++){
        if(falgarray[i].classList.contains("lei")){
            falgarray[i].classList.add("right");
        }else{
            falgarray[i].classList.add("error");
            isallright=false;
        }
       }

       if(!isallright|| falgarray.length!==curlevel.leinyum){
        gameover(false);
       }
       game.onmousedown=null;

}
// 找到dom在tabledate中的对象
function gettable(cell){
var index=cell.dataset.id;
var flattabledate=tabledate.flat();
console.log(flattabledate)
return flattabledate.filter(item => item.index==index)[0];

}

function getbound(obj){
    var rowtop = obj.row - 1 < 0 ? 0 : obj.row - 1;
    var rowbottom = obj.row+1===curlevel.row?curlevel.row-1:obj.row+1;
    var colleft = obj.col-1<0 ? 0:obj.col-1;
    var colright = obj.col+1=== curlevel.col?curlevel.col-1:obj.col+1;   
        
    return{
            rowtop,
            rowbottom,
            colleft,
            colright,
        };
       

}




function findleinum(obj){
//    边界的判断
var count=0;
   var {rowtop, rowbottom,colleft,colright,} =getbound(obj);
   for(var i=rowtop;i<=rowbottom;i++){
    for(var j=colleft;j<=colright;j++){
        if(tabledate[i][j].type==="lei"){
             count++;
        };
    }
   }
     
    return count;
}

function getdom(obj){
    var divarray=$$("td>div");
    // 返回对应下标的div
    return divarray[obj.index]


}

function getaround(cell){

    if(!cell.classList.contains("flag")){
        cell.parentNode.style.border="none";
        cell.classList.remove("canflag");
    }

   
     var tableitem =gettable(cell);
     if(!tableitem){
        return;
     }
    //  代表当前单元格已经被检查过了
     tableitem.checked=true;
    //  查看周围是否有雷
    var leinum=findleinum(tableitem);
    console.log(leinum)
    if(!leinum){
        var {rowtop, rowbottom,colleft,colright,} =getbound(tableitem);
   for(var i=rowtop;i<=rowbottom;i++){
    for(var j=colleft;j<=colright;j++){
        if(!tabledate[i][j].checked)
            getaround(getdom(tabledate[i][j]));
    }
   } 
    }else{

        cell.innerHTML=leinum;
    }
   
}
// cell是用户点击的dom元素
function searchArea(cell){
    //    三种情况
    // 1 是雷 
    if(cell.classList.contains("lei")){
        cell.classList.add("error");
        showanswer();
        return;
    }
    // 2不是雷 然后判断周围雷的数量 若没有 递归搜索
      getaround(cell);

}
function iswin(){
  for(var i =0;i<falgarray.length;i++){
    if(!falgarray[i].classList.contains("lei")){
        return false;
    }
  }
  return true;
}
function gameover(iswin){
 var mess="";
 if(iswin){
    mess="666";
 }else{
    mess="废物";
 }
setTimeout(function(){window.alert(mess)},0)
}
function flag(cell){
   if(cell.classList.contains("canflag")){
    if(!falgarray.includes(cell)){
       falgarray.push(cell);
       cell.classList.add("flag");
       if(falgarray.length===curlevel.leinyum){
        if(iswin()){
            gameover(true);
        }
        showanswer();
       }
    }else{
       var index= falgarray.indexOf(cell);
       falgarray.splice(index,1);
         cell.classList.remove("flag")
    }
    $(".qinum").innerHTML=falgarray.length;
   }
}






function bindevent(){
    
    game.oncontextmenu=function(e){
        e.preventDefault();
    };
    $(".level").onclick=function (e){
        for(i=0;i<btns.length;i++){
            btns[i].classList.remove("active");
        }
        e.target.classList.add("active")
        switch(e.target.innerHTML){
            case "初级":{
                curlevel=config.easy
                
                break;
            }
            case "中级":{
                curlevel=config.normal
                
                break;
            }
            case "高级":{
                curlevel=config.hard
                
                break;
            }
        }
        init();
    }
}



function main(){
    init();
    bindevent();
}
main();