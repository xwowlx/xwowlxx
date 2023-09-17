/**
 * 
 * @param {*} snake 
 */


function drawSnake(snake){
for(var i=0; i<snake.snakepos.length;i++){
    if(!snake.snakepos[i].domContent){
        // 如果进入此if说明是第一次创建蛇 判断是否创建
        snake.snakepos[i].domContent=document.createElement("div");
        snake.snakepos[i].domContent.style.position="absolute";
        snake.snakepos[i].domContent.style.width=snakebody+"px";
        snake.snakepos[i].domContent.style.height=snakebody+"px";
        snake.snakepos[i].domContent.style.left=snake.snakepos[i].x * snakebody+"px";
        snake.snakepos[i].domContent.style.top=snake.snakepos[i].y * snakebody+"px";
             if(snake.snakepos[i].flag==='head'){
                // 说明当前是蛇头
                snake.snakepos[i].domContent.style.background=`url(image/5.png)center/contain no-repeat`;
            }else {snake.snakepos[i].domContent.style.background="#9ddbb1";
            snake.snakepos[i].domContent.style.borderRadius="50%";
        }

    }
    // 需要创建的dom元素添加到all
    document.querySelector(".container").append(snake.snakepos[i].domContent);
}
}



function initgame(){
    // 1 ditu
for(var i=0;i<tr;i++){
    for(var j=0;j<td;j++){
        gridDate.push({
        x:j,
        y:i
        })
    }
}


    // 2 snake
drawSnake(snake);

    
}
// shi wu
function darwfood(){
    // 1.食物的坐标是随机的
    while(true){
// 构成一个死循环，直到生成符合条件的食物
var isrepeat=false;
food.x=Math.floor(Math.random()*tr);
// Math.floor是取整  Math.random是取0到0.1的随机小数
food.y=Math.floor(Math.random()*tr);
// 查看是否符合要求 遍历蛇
for(var i=0;i<snake.snakepos.length;i++){
if(snake.snakepos[i].x===food.x&&snake.snakepos[i].y===food.y){
    isrepeat=true;
    break;
       }
// 2.食物不能生成在外面和蛇的身体上
}
if(!isrepeat){
    break;


}

    }
    if(!food.domContent){
        food.domContent=document.createElement("div");
        food.domContent.style.width=snakebody+"px";
        food.domContent.style.height=snakebody+"px";
        food.domContent.style.position="absolute";
        food.domContent.style.background=`url(image/3.png)center/contain no-repeat`;
        // 初始化food
        document.querySelector(".container").append(food.domContent)
    }
    food.domContent.style.left=food.x*snakebody+"px";
    food.domContent.style.top=food.y*snakebody+"px";
}
darwfood();

function snakemove(){
    // 根据方向计算新蛇头的坐标
    var newHead={
       domContent:"",
       x:snake.snakepos[snake.snakepos.length-1].x+snake.direction.x,
       y:snake.snakepos[snake.snakepos.length-1].y+snake.direction.y,
       flag:"head"
    }
    var oldHead=snake.snakepos[snake.snakepos.length-1];
    oldHead.flag="body";
    oldHead.domContent.style.background="#9ddbb1";
    oldHead.domContent.style.borderRadius="50%";
    snake.snakepos.push(newHead);

    drawSnake(snake);

}


function bindevent(){
    // 键盘事件
    document.onkeydown=function(e){
        if(e.key==="ArrowUp"||e.key.toLocaleLowerCase()==="w"){
           snake.direction=directionNum.up;
        }
        if(e.key==="ArrowDown"||e.key.toLocaleLowerCase()==="s"){
            snake.direction=directionNum.down;
        }
        if(e.key==="ArrowLeft"||e.key.toLocaleLowerCase()==="a"){
            snake.direction=directionNum.left;
        }
        if(e.key==="ArrowRight"||e.key.toLocaleLowerCase()==="d"){
            snake.direction=directionNum.right;
        }
        snakemove();
    }
}


function main(){
// chu shi hua
initgame();
// 绑定事件
bindevent();
}
main();