// peizhi
var gridDate=[];

// 整个网格的行与列
var tr=30;
var td=30;
var snakebody=20;
var directionNum={
    left:{x:-1,y:0,flag:'left'},
    right:{x:1,y:0,flag:'right'},
    up:{x:0,y:-1,flag:'up'},
    down:{x:0,y:1,flag:'down'},
}
// snake
var snake={
// 蛇一开始移动的方向
   direction : directionNum.right, 
    // chu shi wei zhi
    snakepos:[
        {x:0,y:0,domContent:"",flag:'body'},
        {x:1,y:0,domContent:"",flag:'body'},
        {x:2,y:0,domContent:"",flag:'body'},
        {x:3,y:0,domContent:"",flag:'head'}, 
    ]
    
}
var food={
    x:0,
    y:0,
    domContent:""
}
// 新蛇头与旧蛇头的位置关系
