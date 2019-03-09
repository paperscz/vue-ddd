
### 第一阶段: 命名阶段
1. 初始化 npm 的配置 npm init -y (文件夹不能是中文和webpack)
2. 安装 webpack : npm i webpack webpack-cli -D
    > -D (--save-dev) 开发阶段依赖的包 -D
    > webpack 打包工具的核心包
    > webpack-cli 可以使用webpack的命令
3. 准备要打包的源文件
4. 在package.json 里的 scripts 添加 
    "build": "webpack ./src/main.js --mode development"
    > mode 环境 (没设置,默认是 production(发布环境(压缩)))
    >                        decelopment(开发环境(不压缩))
5. npm run build

案例: 
    1. 在js文件中引入 jquery (通过es6的方法)(import $ from "jquery")
    2. 由于浏览器不识别 es6 语法, 所以要用webpack 打包 ,再引入打包后的文件(则可以正常渲染)

### 第二阶段: 配置
1. webpack 打包方式

- 第一种 -> 命令行: 
    `webpack 入口路径 --output 出口路径 --mode development`
    'webpack ./src/main.js --output ./dist/bundle.js'
    出口路径(打包到的位置): 可以自己指定文件夹/文件名

- 第二种 -> 配置文件: 
    1. 在根目录下, 创建一个配置文件: `webpack.config.js`
    2. 配置(package.json文件中 build 中只需写 webpack)
    
const path = require("path")
// 导出配置对象
module.exports = {
    // 入口
    entry: path.join(__dirname,'./src/main.js'),
    // 出口
    output: {
        // 出口目录
        path: path.join(__dirname,"./dsit"),
        // 出口文件
        filename: 'bundle.js'
    },
    // 环境
    mode: "development"
}

### 第二阶段: html-webpack-plugin(插件)
> 把html文件 注入到 dist 文件目录下
> 根据demo.html 打包到dist文件, 会自动帮我们 引入js文件

使用: 
    1. 安装: npm i html-webpack-plugin -D  
    2. 引入: `const htmlwebpackplugin = require('html-webpack-plugin')`
    3. 配置:
        ( 在webpack.config.js中配置,接着写 )
        // 插件
        plugins: [
            // 处理 
            new htmlwebpackplugin({
                template : path.join(__dirname,'./src/demo.html')
            })
        ]
    4. npm run build


### 第二阶段: webpack-dev-server 
> 作用: 为使用webpack打包提供给一个服务器环境
(把代码发到了服务器中,和本地dist文件无关)
 - 自动开启一个服务器
 - 自动打开浏览器
 - 自动监听文件变化,时时更新

> 使用: 
1. 安装 npm i webpack-dev-server -D
2. 使用: 新增一个脚本 ` "dev" : "webpack-dev-server",`
--方式1: 命令行: "dev" : "webpack-dev-server --open --hot --port 3001"

--方式2: 配置文件中(webpack.config.js): 
        "dev" : "webapck-dev-server --hot" //在命令行中
        {--hot 写在命令行中(因为在这写还需引入别的插件,更麻烦)}
        devServer: {                       //在配置文件中
            open: true,   //自动打开浏览器
            port: 8080    //新的端口名
        }

3. 执行: npm run dev
4. 配置1 : --open : 自动打开浏览器
5. 配置2 : --hot : 热更新  哪个页面改变,只刷新哪个页面(不会全部刷新消耗性能)
6. 配置3 : --port 3001  指定新的端口号 


### 第三阶段: 开发和上线 ?
> dev 和 build (两个脚本)

> 开发: `npm run dev`  (可以监听变化实时更新)
1-使用的是 `webpack-dev-server`
2-是把我们的项目放到服务器里去开发, 
3-和本地的文件无关(删了也不影响)

> 发布: `npm run build`
1-使用的是 `webpack`
2-会打出来一个包, (包放到公司的后台)

// 模拟当前目录为后台服务器环境, 托管这个包
> 1. 安装 npm i http-server -g
> 2. 在当前目录下打开 poweshell 输入 http-server