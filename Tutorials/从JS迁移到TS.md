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



