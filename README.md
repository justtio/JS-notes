# JS-Notes
---
## Some textnotes about "Professional JavaScript for Web Developers-3d"
- Pre-reading
[Modern JS Tutorial](https://javascript.info/)


## Chapter 7 面向对象的程序设计
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
 
 - 闭包只能取得包含函数中任何变量的最后一个值。并且闭包所保存的是整个变量的对象，而不是某个特殊的变量。
 
 ```
 function createFunctions (){
    var result = new Array();
    
    for (var i=0; i < 10; i++){
        return[i] = function (){
            return i;
        };
    }
    
    return result;
 }
 //该函数返回的函数数组的每个变量i的值都是10
 
 //解决方案：通过创建另一个匿名函数强制让闭包的行为符合预期。
 
 function createFunctions (){
    var result = new Array();
    
    for (var i=0; i < 10; i++){
        result[i] = function(num){
            return function(){
                return num;
            };
        }(i);
    return result;
 }
 //num 是函数最终的返回值。
 //当调用每个匿名函数是，我们传入的变量i，把当前值复制给num，所以result数组中的每一个函数都会一个num的变量副本。
 //这样就能返回各自不同的数值。
 
 ```
 
 #### 2.7.2 关于this对象
 - this对象运行时是基于函数的执行环境绑定的，全局函数中this=window。若作为某个对象的方法调用时，this=那个对象
 - 匿名函数的执行环境具有全局性，因此this通常指向window
 
 ```
 var name = "The Window";
 
 var object = {
     name : "My Object",
     
     getNameFunc : function(){
     
          return function (){
              return this.name;
          };
     }
 };
 
 alert(object.getNameFunc()());  //"The Window" (非严格模式下）-this指向window
 
 //__每个函数在被调用时会自动取得两个变量：this和arguments__
 // 内部函数在搜索这两个变量时会止步于其活动对象，因此不可能直接访问外部函数中的这两个变量。
 // 但若将外部作用域中的this对象保存在一个闭包能够访问到的变量里，便可以让闭包访问该对象
 
 var name = "The Window"
 
 var object = {
 
     name : "My Object",
     
     getNameFunc : function(){
        var that = this;
        return function (){
            return that.name;
        };
     }
 };
 
 alert(object.getNameFunc()());  //"My Object" 
 
 /* 定义匿名函数前this赋值给that变量，定义闭包之后，闭包可以访问到这个变量，因为其是在包含函数中
 特意声明的变量，所以即便在函数返回之后，that依旧引用的是object。
 */
```

__特殊情况__

``` 
var name = "The Window";

var object = {
    name : "My Object",
    
    getName : function(){
        return this.name;
    }
};

object.getName();//"My Object". 此处的object.getName与this.name是一致的。
```
#### 7.2.3 内存泄漏

- 当闭包作用域链中保存了一个HTML元素，这个元素则无法被销毁。
```
function assignHandler(){
    var element = document.getElementById("someElement");
    
    element.onclick = function(){
        alert(id);
    };
}
// 由于匿名函数的存在，element的引用次数至少为1，所以被占用的内存无法被收回。

//解决方案

function assignHandler(){
    var element = document.getElementById("someElement");
    var id = element.id;
    
    element.onclick = function (){
    
      alert(id);
    };
    
    element = null;
}//解除对DOM对象的引用顺利减少引用数，从而回收内存。
```

### 7.3 模仿块级作用域

- 匿名函数模仿块级作用域（私有作用域）
```
(function(){
    //这里是块级作用域
 })();
 
//将函数声明包含在一对圆括号里实际是作为函数表达式。
```

```
function outputNumbers(count){
    (function (){
        for (var i=0; i < count; i++){
            alert(i);
        }
    })();
    
    alert(i); //出错，因为匿名函数中定义的任何变量都会在执行结束时被销毁
}

//创立私有作用域，可以避免项目当中的一些冲突（如命名冲突）

（function(){
      var now = new Date();
      if (now.getMonth() == 0 && now.getDate() == 1){
          alert("Happy new year!");
      }
 })();
 ```
 
 ### 7.4 私有变量
 - 在任何函数中定义的变量都可被人作为私有变量因为无法从外部访问这些变量。
 - 私有变量包括 `函数的参数`,`局部变量`,`函数内部定义的其他函数`.
 - 可用闭包创建访问私有变量的公有方法
 __特权方法__
 1. 在构造函数中定义特权方法
 ```
 function MyObject(){
 
     //私有变量和私有函数
    var privateFunction = 10;
    
    function privateFunction(){
        return false;
    }
    
    //特权方法
    this.publicMethod = function (){
        privateVariable++;
        return privateFunction();
    };
 }
 
 function Person(name){
    this.getName = function(){
        return name;
    };
    
    this.setName = function (value){
        name = value;
    };
 }
 
 var person = new Person("levi");
 alert(person.getName()); //"levi"
 person.setName("Greg");
 alert(person.getName()); //"Greg"
 //隐藏不应该被直接修改的数据 
```
2. 静态私有变量
 ```
（function (){
    //私有变量和私有函数
    var privateVariable = 10;
    
    function privateFunction(){
      return false;
    }
    
    //构造函数
    MyObject = function(){
    };
    
    //特权方法
    MyObject.prototype.publicMethod = function(){
        privateVariable++;
        return privateFunction();
    };
    })();
```
#### 7.4.1 模块模式

```
var singleton = function (){

  //私有变量和私有函数
  var privateVariable = 10;
  
  function privateFunction(){
      return false;
  }
  //特权方法和属性
  return {
  
      publicProperty: true,
      
      publicMethod: function(){
          privateVaribale++;
          return privateFunction();
      }
  };
}();
// 这种模式在需要对单例进行某些初始化，又需要维护其私有变量时非常有用

var application = function(){

     //私有变量和函数
    var components = new Array();
    
    //初始化
    components.push(new BaseComponent());
    
    //公共
    return {
        getComponentCount : function(){
          return components.length;
        },
        
        registerComponent : function(component){
            if (typeof component == "object"){
                components.push(compenent);
            }
        }
    };
  }();
  ```
  #### 7.4.3增强的模块模式
  
  ```
  var singleton = function(){
  
      //私有变量和私有函数
      var privateVaribale = 10;
      
      function privateFunction(){
          return false;
      }
      
      //创建对象
      var object = new CustomType();
      
      //添加公有属性和方法
      object.publicProperty = true;
      
      object.publicMethod = function(){
      
          privateVariable++;
          return privateFunction();
      };
      
      //返回这个对象
      return object；
   }();
   
   
   var application = function (){
   
      //私有变量和函数
      var components = new Array();
      
      //初始化
      components.push(new BaseComponent());
      
      //创建application的一个局部副本
      var app = new BaseComponent();
      
      //公共街口
      app.getComponentCount = function (){
          return components.length;
      };
      
      app.registerComponent = function (component){
          if (typeof component == "object"){
              components.push(component);
          }
      };
      
      //返回这个副本
      
      return app；
    }();    
```

    
   

 
    
 














 
 
 
 
