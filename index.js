/* var color = "blue";

function changeColor(){

    var anotherColor = "red";

    function swapColors(){
        var tempcolor = anotherColor;
        anotherColor = color;
        color = tempcolor;

        //此处可以访问 color anotherColor 和 tempColor
    }

    swapColors();
    //此处可以访问color anotherColor 但不能访问 tempColor
}
//此处只能访问color
changeColor();

//总结： 父及以上执行环境无法访问子环境中的变量及函数，反之则可。
//仅限于向上搜索模式，无法向下搜索

//有两个语句可以延长作用链 try-catch,with 语句

//执行环境和作用域是针对变量及函数的定义。跟语句是不相关的。



 */
