<h1>从JS迁移到TS (Migrating from JavaScript)</h1>

<h2>目录</h2>

## 介绍

TypeScript不是凭空出现的。它的创建伴随着我们意识中的整个JavaScript生态系统，并且TypeScript的许多语法和概念都存在于如今的JavaScript中。将一套基于JavaScript的代码转换为基于TypeScript的代码通常有些无聊并且不具挑战性。在本章节中，我们将看到如何开始进行这种转换。这里假设我们已经阅读了足够的手册来编写新的TypeScript代码。

## 设置项目目录 (Setting up your Directories))

如果你正在编写原生的JavaScript代码，很可能我们将直接运行这些JavaScript代码，这些`.js`文件可能位于`src`，`lib`，或者`dist`目录下。

在这种情况下，这些`.js`文件将作为TypeScript的输入，然后我们将要执行的是TypeScript的输出文件。在JS迁移到TS的过程中，我们需要区分这些输入文件，以防止TypeScript对它们进行覆盖。举例来说，如果输出文件需要存在于一个特定的目录下，那么这个特定的目录就将作为我们的输出目录。

你可能正在使用一些中间步骤来构建JavaScript代码，比如将`.js`文件打包或者使用`Babel`这样的翻译器。如果是这样，那么你可能已经有了像这样的一种目录结构。

在随后的内容中，我们假设项目的目录结构是这样的：

```
projectRoot
├── src
│   ├── file1.js
│   └── file2.js
├── built
└── tsconfig.json
```

如果你还有一个和`src`平级的`tests`目录，那么很可能在这两个目录中，分别存在一个`tsconfig.json`配置文件。

## 编写配置文件 (Writing a Configuration File)

TypeScript使用一个叫`tsconfig.json`的文件来管理整个项目的配置项。比如说哪些文件需要被包含，哪些检查类型需要被使用（类似的有`.eslintrc`，`babel.config.json`等等）。下面是一个最基本的项目配置：

```json
{
  "compilerOptions": {
    "outDir": "./built",
    "allowJs": true,
    "target": "es5"
  },
  "include": ["./src/**/*"]
}
```

上面的代码对TypeScript做了这些配置：

1. `include` - 读取任何在`src`目录下的合法文件。
2. `allowJs` - 允许`.js`文件作为输入文件。
3. `outDir` - 将编译后的文件输出到`built`目录。
4. `target` - 将新的JavaScript语法翻译为ECMAScript 5这样的老版本便于浏览器兼容运行。

有了这些配置，当我们在项目根目录下执行`tsc`命令时，将看到所有编译后的文件被输出到了`built`目录下，同时，`built`目录下的文件结构和`src`下的目录结构保持一致。现在，我们就可以在项目中使用TypeScript了。

## 早期福利 (Early Benefits)

尽管才刚刚开始进行迁移，我们就已经能够享受到一些TypeScript给我们带来的一些好处了。当我们打开一个编辑器（比如说[VS Code](https://code.visualstudio.com/)或者[Visual Studio](https://visualstudio.com/)，我们通常能够得到如自动补全这样的工具支持。也能够捕获到诸如以下的一些确定的bugs：

- `noImplicitReturns` - 防止函数缺少`return`返回值。
- `noFallthroughCasesInSwitch` - 忘记为某个`case`添加`break`语句。

TypeScript也将对一些无法执行的代码及标签进行警告，当然我们也可以通过设置`allowUnreachableCode`和`allowUnusedLabels`分别进行允许。

## 使用构建工具进行集成 (Integrating with Build Tools)

这里仅对Webpack项目进行说明。

### Webpack

对于Webpack集成是非常简单的。我们可以使用`awesome-typescript-loader`-一个TypeScript加载。它与`source-map-loader`配合使用能够更方便地进行代码调试。只需要运行：

```
npm install awesome-typescript-loader source-map-loader
```

然后在项目的Webpack配置文件（如`webpack.config.js`）中进行配置即可，例如：

```js
module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "./dist/bundle.js"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  }

  // Other options...
};
```

> 注意：`awesome-typescript-loader`需要在其他处理`.js`文件的加载器之前执行。

同样的规则适用于[ts-loader](https://github.com/TypeStrong/ts-loader)，这是用于Webpack的另一个TypeScript加载器。两者的比较请参考[这里](https://github.com/s-panferov/awesome-typescript-loader#differences-between-ts-loader)。

## 转换成TypeScript文件 (Moving to TypeScript Files)

目前为止，我们已经准备好使用TypeScript文件了。将JavaScript迁移到TypeScript，第一步则是重命名`.js`文件为`.ts`文件。如果项目使用的是JSX，我们则需要重命名为`.tsx`。

完成了这个步骤了吗？棒棒哒！恭喜你你已经成功地将一个JavaScript文件迁移到了TypeScript！

当然，这也许感觉怪怪的（so easy right？）。当我们使用带TypeScript支持的编辑器打开这个ts文件时（或者如果我们直接使用命令行执行`tsc --pretty），将看到满屏的红色波浪下划线（这是真的）。你可以将这些波浪下划线想象成Microsoft Word编辑文档时会看到的下划线。虽然这些错误或者警告存在，但是TypeScript仍然会编译我们的代码，就像Word仍然允许我们打印文档一样。

如果你感觉这样太不严谨（带着一大堆错误来编译代码），我们也可以增强这种松散行为。比如说，当TypeScript检测到错误时，我们不希望对这些代码进行编译输出，则可以使用`noEmitOnError`配置项。从这种意义上来讲，TypeScript有一个严格程度的旋钮，你可以把旋钮调到你想要的高度。换句话说，我们可以根据开发人员的情况，以及项目情况，来灵活地对这个严格程度进行调节，以平衡软件质量以及开发进度。

如果我们计划使用更加严格的配置，最好的办法就是从现在起就打开这些更严格的检查项（详见[这里](https://www.typescriptlang.org/v2/docs/handbook/migrating-from-javascript.html#getting-stricter-checks)）。例如，如果不希望TypeScript在没有明确声明下对`any`类型进行推断，我们可以在修改文件前打开`noImplicitAny`。例如：

```ts
// noImplicitAny: true
let o; // 错误，没有显式地对any进行类型注释
let o: any; // 正确
```

虽然这些强类型检测一时间一定程度上让人感觉喘不过气来，当时从长期利益出发，这些检测带来的好处又是肉眼可见的。

## 消除错误 (Weeding out Errors)

就像我们之前提到的，我们希望在转换为ts代码后获取错误信息。最重要的便是一条条地逐个查看这些错误信息，然后决定如何进行处理。通常来讲这些都是“合理的”bugs，但是有时我们必须解释为什么这样做比TypeScript更好（意思是如果你不能说服TypeScript编译器，那么就应该遵循TypeScript的规则）。

### 导入模块 (Importing from Modules)

当遇到许多诸如`Cannot find name 'require'.`和`Cannot find name 'define'.`这样的错误时，项目中很可能用到了模块。当然我们能够通过说服TypeScript这些函数是真实存在的，例如：

```ts
// For Node/CommonJS
declare function require(path: string): any;

// For RequireJS/AMD
declare function define(...args: any[]): any;
```

但这些都属于骚操作，更好的方式是使用TypeScript语法来进行模块引入。

首先，我们需要通过设置TypeScript的`module`标记来授权这些模块系统。合法的模块系统有`commonjs`，`amd`，`system`和`umd`。就像下面这样，将：

```ts
// Node/CommonJS
var foo = require("foo");
foo.doStuff();
// RequireJS/AMD
define(["foo"], function(foo) {
  foo.doStuff();
});
```

改写为TypeScript的语法：

```ts
import foo = require("foo");
foo.doStuff();
```

### 获取声明文件 (Getting Declaration Files)

如果你刚开始转换到TypeScript模块引入，很可能遭遇到像`Cannot find module 'foo'.`这样的错误。这种问题很可能是由于我们没有声明文件来描述模块。幸运的是这很好解决。如果TypeScript报错说找不到`lodash`，那么我们只需要使用`npm`来安装声明文件：

```
npm install -S @types/lodash
```

如果我们使用的是commonjs以外的模块选项，则需要将moduleResolution选项设置为node。

然后，我们就能够正常地导入`lodash`，并且得到精确地自动补全提示信息。

### 从模块中进行导出 (Exporting from Modules)

通常，从模块进行导出是以为`exports`或者`module.exports`添加属性并赋值的形式来进行：

```js
module.exports.feedPets = function(pets) {
  // ...
};
```

而TypeScript允许我们使用顶级的`export`声明：

```ts
export function feedPets(pets) {
  // ...
}
```

有时我们需要覆写整个`exports`对象。即整个导出对象就是一个可立即调用的模块，例如：

```js
var express = require("express");
// express模块整个是一个函数，我们可以直接进行调用
var app = express();
```

对于这种情况之前可能是这样的：

```js
function foo() {
  // ...
}
module.exports = foo;
```

在TypeScript中，我们可以使用`export =`这种结构：

```ts
function foo() {
  // ...
}
export = foo;
```

### 参数过多/过少 (Too many/too few arguments)

有事我们会发现调用的函数有太多或者太少的参数。典型来讲，这是一个bug，但是在一些特定的情况下，我们可能已经使用`arguments`对象来获取函数的参数，而不是显式地声明这些参数：

```js
function myCoolFunction() {
  // 条件一：
  // 如果有两个参数并且第二个参数不是数组（这里可能文档写错了，应该是说第二个参数是数组的情况）
  if (arguments.length == 2 && !Array.isArray(arguments[1])) {
    var f = arguments[0];
    var arr = arguments[1];
    // ...
  }
  // 条件二：
  // ...
}

// 满足条件一：
myCoolFunction(
  function(x) {
    console.log(x);
  },
  [1, 2, 3, 4]
);
// 满足条件二：
myCoolFunction(
  function(x) {
    console.log(x);
  },
  1,
  2,
  3,
  4
);
```

基于上述情况，我们需要使用TypeScript对`myCoolFunction`进行函数重载：

```ts
function myCoolFunction(f: (x: number) => void, nums: number[]): void;
function myCoolFunction(f: (x: number) => void, ...nums: number[]): void;
function myCoolFunction() {
  if (arguments.length == 2 && !Array.isArray(arguments[1])) {
    var f = arguments[0];
    var arr = arguments[1];
    // ...
  }
  // ...
}
```

上例中，我们为`myCoolFunction`添加了两个重载签名。第一个重载会检查第一个参数是否是函数（且参数类型为`number`），然后检查第二个参数是否为`number`数组。第二个重载对第一个参数进行相同的检查，然后检查第二个参数是否是剩余参数([rest parameter](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters))（这里是...nums，类型为`number`数组）。

### 按顺序添加属性 (Sequentially Added Properties)

一些人（大多数人）可能认为先创建对象，然后再给对象添加属性这样显得方便并且美观：

```js
// let options: {}
let options = {};
// 错误，Property 'color' does not exist on type '{}'.
options.color = "red";
// 错误，Property 'volume' does not exist on type '{}'.
options.volume = 11;
```

TypeScript会警告我们`color`和`volume`不能指派给`options`，因为首先，编译器会认为`options`的类型是不具有任何属性的字面量对象`{}`。如果我们一开始就将所有属性声明放入字面量对象中，则不会出现错误。

```ts
let options = {
  color: "red",
  volume: 11
};
options.color = "black";
```

更能充分利用TypeScript类型检测的方法是，首先定义一个接口来描述我们的对象类型，然后在声明字面量对象时加上类型断言：

```ts
interface Options {
  color: string;
  volume: number;
}

let options = {} as Options;
options.color = "red";
options.volume = 11;
```

当然我们也可以简单通过将`options`的类型指定为`any`，但是这样做的话，使用TypeScript就失去意义了。

### any，Object和{} (any, Object, and {})

我们可能尝试使用`Object`或者`{}`来描述一个能够拥有任何属性的对象，因为大多数情况下，`Object`是最通用的类型。但是，实际上`any`才是在这些情况下我们想要的，因为`any`才是最***灵活***的类型。

比如说我们有一个变量被声明为了`Object`类型，那么调用这个变量的`toLowerCase()`方法是不可行的（因为Object是所有类的基类，它并不具有String类的方法）。过于通用的类型意味着我们能够使用强类型做的事情更少，但是`any`比较特殊，因为我们能够对使用这种类型的对象做任何事情。例如我们可以直接调用任何方法，对其进行任何形式的构建，访问它的任何成员等等：

```ts
let myCloth: any;

myCloth.color // OK
myCloth.destroy() // OK
myCloth = { // OK
  color: "red",
  size: "L"
}
```

> 注：当我们在任何情况下使用`any`时，都会失去大部分的类型错误检测和编辑器对TypeScript的支持。所以，且用且珍惜！

并且，当我们最终决定使用`Object`和`{}`时，请选择使用`{}`。尽管它们几乎一样，但是从技术上说，字面量`{}`类型在一些特定的情况下是比`Object`更加通用的类型（暂时还未完全理解）。

## 得到更严格的检测 (Getting Stricter Checks)

TypeScript为程序带来了更加安全且具备分析能力的检测。一旦将程序的代码转换为TypeScript，我们就能够启用这些更加安全的检测。

### 没有默认的any (No Implicit any)

在一些特定的情况下，TypeScript无法确定具体的数据类型。为了尽可能放宽限制，编译器将认为这些类型为`any`。虽然这对代码迁移有好处（例如减少了开发者的工作量和深入学习成本），但这也意味着我们失去了类型的安全性，而且我们也失去了其他相同工具的支撑。好消息是，我们可以通过开启`noImplicitAny`选项来捕获这些错误并进行修复。

### 严格的null & undefined检查 (Strict null & undefined Checks)

默认情况下，TypeScript假设`null`和`undefined`属于任何类型。这意味着任何其他类型的变量都能够被赋值为`null`和`undefined`。显然这是不严谨的，因为如果一个变量属于`string`类型，那么它的默认值应该是`''`而不是`null`或`undefined`的其中一种。同理如果一个变量属于`number[]`类型，那么它的默认值应该是`[]`。这无论是在JavaScript和TypeScript中，都属于常见的bugs，因为它们很可能导致边界错误（[Edge Cases](https://en.wikipedia.org/wiki/Edge_case)）。同样，我们可以通过开启`strictNullChecks`对这些潜在的问题进行捕获。

当`strictNullChecks`开启时，`null`和`undefined`拥有了各自的类型，分别是`null`和`undefined`。在任何***可能***是`null`的情况下，我们都能够使用联合类型来进行类型注释。所以例如，如果一个变量可能是`numder`或者`null`，我们可以将其注释为`number | null`。

还有一种情况是，如果TypeScript认为一个值可能为`null`或者`undefined`，但是我们能肯定它不是这两个值中的一种，也可以通过使用后缀`!`操作符来告知编译器：我知道这样做时对的（也许）：

```ts
declare var foo: string[] | null;

// 错误，'foo'可能是'null'，而'null'没有'length'属性
foo.length; // error - 'foo' is possibly 'null'
// 正确，告诉编译器，我们确定'foo'是'string[]'类型
foo!.length; // okay - 'foo!' just has type 'string[]'
```

> 注：当使用`strictNullChecks`时，依赖库也需要相应地开启`strictNullChecks`。

### 没有默认的this (No Implicit this)

当在类的外部使用`this`关键字时，它的类型默认为`any`。例如，试想有一个`Point`类，并且我们想为该类添加一个函数方法： 

```ts
class Point {
  constructor(public x, public y) {}
  getDistance(p: Point) {
    let dx = p.x - this.x;
    let dy = p.y - this.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }
}
// ...

// Reopen the interface.
// 再声明一个同名接口，声明一个函数签名
interface Point {
  distanceFromOrigin(): number;
}
Point.prototype.distanceFromOrigin = function() {
  return this.getDistance({ x: 0, y: 0 });
};
```

默认情况下，上述代码没有任何问题。但是正如我们所说，类外部的`this`默认为`any`类型，也就意味着，假如我们在`distanceFromOrigin`中，将`this.getDistance`写成了`this.getDistace`，编译器不会报任何错误。这就对修复错误很不友好了，所以我们需要明确此时`this`的指向类型。通过开启`noImplicitThis`选项，编译器会告诉我们这里的`this`指向不明确。为了修复这个错误，我们需要在参数的第一位，也是隐藏位，显式地对`this`进行类型注释：

```ts
Point.prototype.distanceFromOrigin = function(this: Point) {
  return this.getDistance({ x: 0, y: 0 });
};
```

此时，由于`this`为`Point`类型，当由于马虎造成了拼写错误时，编译器则会提示我们`Point`上没有`getDistace`这个方法。