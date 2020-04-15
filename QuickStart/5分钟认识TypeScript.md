<h1>5分钟认识TypeScript</h1>

让我们一起，通过使用TypeScript，创建一个简单的web应用来认识她吧！

<h2>目录</h2>

- [安装TypeScript](#%e5%ae%89%e8%a3%85typescript)
- [创建你的第一个TypeScript文件！](#%e5%88%9b%e5%bb%ba%e4%bd%a0%e7%9a%84%e7%ac%ac%e4%b8%80%e4%b8%aatypescript%e6%96%87%e4%bb%b6)
- [编译TypeScript代码](#%e7%bc%96%e8%af%91typescript%e4%bb%a3%e7%a0%81)
- [类型注释 (Type annotations)](#%e7%b1%bb%e5%9e%8b%e6%b3%a8%e9%87%8a-type-annotations)
- [接口 (Interfaces)](#%e6%8e%a5%e5%8f%a3-interfaces)
- [类 (Classes)](#%e7%b1%bb-classes)
- [友情提示](#%e5%8f%8b%e6%83%85%e6%8f%90%e7%a4%ba)

## 安装TypeScript

以下两种方法均可获取TypeScript工具：

- 使用npm（Node.js包管理工具）进行安装
- 安装Visual Studio插件（这里仅考虑前端玩家，故该部分不会提及，请见下方提示语）

> 注意：Visual Studio 2017 and Visual Studio 2015 Update 3 include TypeScript by default. If you didn’t install TypeScript with Visual Studio, you can still [download](https://www.typescriptlang.org/#download-links) it.

对于前端玩家：

```js
// 全局或非全局安装，随性选择吧
npm install -g typescript
// or
npm install typescript
```

## 创建你的第一个TypeScript文件！

在你的编辑器中，创建名为`greeter.ts`的文件，然后输入以下代码并保存：

```ts
function greeter(person) {
  return "Hello, " + person;
}

let user = "Jane User";

document.body.textContent = greeter(user);
```

## 编译TypeScript代码

```js
// 全局
tsc greeter.ts
// 非全局
npx tsc greeter.ts
```

以上命令执行后，编译器会生成一个同名的.js文件，这里是`greeter.js`。

到此为止，`greeter.ts`中的代码与普通的JavaScript并无两样。现在我们就来使用一些由TypeScript提供的新特性：类型注释 —— 添加`: string`代码到形参`person`后，结果如下：

```ts
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";

document.body.textContent = greeter(user);
```

## 类型注释 (Type annotations)

类型注释是用于标识函数或者变量类型的语法，也是TypeScript最著名的特性之一。在上边的例子中，我们将形参的类型标识为了`string`，即字符串类型。那么问题来了，既然TypeScript最终生成的是JavaScript代码。我们知道，JavaScript是一种弱类型的语言，其变量的类型可以是任意类型的值。那么在这里，我们在调用函数时，传入一个数组变量，像下面这样：

```ts
function greeter(person: string) {
  return "Hello, " + person;
}

let user = [1, 2, 3];

document.body.textContent = greeter(user);
```

重新编译该.ts文件，你会得到如下报错：

```
error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.
```

类似的，当你在调用`greeter`函数时，不传入任何参数。TypeScript会提示，在你调用该函数时，参数的数量不正确。也就是说，TypeScript提供给我们一种能力，那就是根据代码结构和类型注释对代码进行静态分析，这也是JavaScript天生的缺陷之一。通常这种缺陷，带给我们的便是日后维护上的困难。设想在编写一个日期控件的时候，我们需要一个比较函数，该函数用于比较前一个日期与后一个日期的大小，假设调用时，由于疏忽我们将传入的参数中，一个传入了字符串，一个传入了数字，函数虽然可能正常执行，但得到的结果却是未知的，而这种错误往往不容易被发现。

> 注意：虽然TypeScript对错误进行了提示，但是仍然生成了对应的.js文件。这意味着即使有 **逻辑错误** 存在，你仍然能够使用TypeScript进行编译。

## 接口 (Interfaces)

让我们进一步编写示例代码。这里将使用接口来描述一个包含`firstName`和`lastName`属性的对象。在TypeScript中，当两种类型的内部结构一致时，他们就能够相互兼容。这种特性使得我们在实现一个接口时，只需要对结构进行声明，而不需要进行具体实现（`implements` clause）。

```ts
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = {
  firstName: "Jane",
  lastName: "User"
};

document.body.textContent = greeter(user);
```

上述代码中，参数的类型注释为`Person`，由接口定义可知，该参数应该为一个包含两个属性的对象。

## 类 (Classes)

最后，我们将通过引入类的概念来完成最终的示例代码。TypeScript支持JavaScript的新特性（当然支持，这是因为TypeScript是一种JavaScript的强类型超集，并且能够编译成原生JavaScript语句。这句话就挂在[官方首页](https://www.typescriptlang.org/index.html)，大家可自行感受。），例如支持[基于类的面向对象编程](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)特性。

在这里，我们将创建一个`Student`类，它包含一个构造器和一些共有属性。需要注意的是，类和接口是能够一起愉快地玩耍的，而其抽象程度全权交由开发者来决定。改造后的代码如下所示：

```ts
class Student {
  fullName: string;
  // 注意：这里的public声明在参数前，其作用的为该类自动创建同名的属性
  constructor(public firstName: string, public middleInitial: string, public lastName: string) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
  // 等同于：
  /*
  public firstName: string;
  public middleInitial: string;
  public lastName: string;
  constructor(firstName: string, middleInitial: string, lastName: string) {
    this.firstName = firstName;
    this.middleInitial = middleInitial;
    this.lastName = lastName;
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
  */
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.textContent = greeter(user);
```

执行编译后，我们得到最终的可执行.js文件。代码如下：

```js
"use strict";
var Student = /** @class */ (function () {
  function Student(firstName, middleInitial, lastName) {
    this.firstName = firstName;
    this.middleInitial = middleInitial;
    this.lastName = lastName;
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
  return Student;
}());

function greeter(person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
var user = new Student("Jane", "M.", "User");
document.body.textContent = greeter(user);
```

观察编译后的代码，我们可以发现`/** @class */`声明了该函数是一个TypeScript中的类，也即是JavaScript中基于原型链的面向对象概念。

## 友情提示

请务必使用Visual Studio Code编辑器进行TypeScript项目的开发，以便享受到最友好的代码提示以及最丝滑的体验，更多玩法请在逐步深入的过程中自行开发。




