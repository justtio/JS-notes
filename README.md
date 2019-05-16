# JS-Notes
---
## Some textnotes about "Professional JavaScript for Web Developers-3d"
- Pre-reading
[Modern JS Tutorial](https://javascript.info/)


## Chapter 7

### 函数表达式
1. 函数声明

```
function functionName(arg0, arg1, arg2) {
  //函数体
}
console.log(functionName.name); //"functionName"

```

**重要特征**：`函数声明提升`
可把函数声明放在调用语句之后,执行时会先读取函数声明。
```
sayHi();
function sayHi(){
  alert("Hi");
}
```
2. 函数表达式
```
//匿名函数
var functionName = function(arg0, arg1, arg2){
  //  函数体
};
```
___使用前需要先赋值___
```
sayHi();
var sayHi = function(){
  alert("Hi");
};
```

_若把函数作为其他函数的值返回，是能够先创建函数再赋值变量的_
```
function createComparisonFunction(propertyName){
  return function (obj1, obj2){
    var value1 = obj1[propertyName];
    var value2 = obj2[propertyName];
    
    if (value1 > value2){
      return -1;
    } else if (value1 > value2){
      return 1;
    } else {
      return 0;
    }
   };
 }
 //createComparisonFunction()返回了一个匿名函数，函数可以被赋值一个变量或者其它方式调用。
 ```
 
 ### 7.1 递归
 - 递归函数是在一个函数通过名字调用自身的情况下构成的。
 ```
 function factorial (num){
    if (num <= 1){
        return 1;
    } else {
        return num * factorial(num-1);
    }
  }
  //递归阶乘函数
  
  var anotherFactorial = factorial;
  factorial = null;
  alert(anotherFactorial(4));//出错！此时factorial不再是函数，而又必须执行factorial().
  
  //arguments.callee是一个指向正在执行函数的指针，因此可以用其实现对函数递归调用。
  
  function factorial(num){
      if (num <= 1){
        return 1;
      } else {
          return num * arguments.callee(num-1);
      }
   }
   //在编写递归函数时，运用arguments.callee比运用函数名更为保险。
   
   //但在严格模式下，无法通过脚本访问arguments.callee，解决办法可以通过使用命名函数
   
   var factorial = (function f(num){
       if (num <= 1) {
          return 1;
       } else {
          return num * f(num-1);
       }
   });
   ```
   
   ### 7.2 闭包
   - 闭包是指有权访问另一个函数作用域中变量的函数。常见的创建方法：在一个函数的创建另一个函数。
   ```
   function createComparisonFunction(propertyName){
   
    return function (obj1, obj2){
     var value1 = obj1[propertyName];
     var value2 = obj2[propertyName];
    
     if (value1 > value2){
          return -1;
     } else if (value1 > value2){
          return 1;
     } else {
          return 0;
     }
   };
 }//内部函数作用域链包含createComparisonFunction（）的作用域。
 ```
 __闭包会比其他函数更占内存，因为携带多个作用域__
 
 #### 7.2.1 闭包与变量
  
  
  
  
  
  
  
  
  
 
 
 
 
