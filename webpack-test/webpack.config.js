const path = require("path")

const htmlwebpackplugin = require('html-webpack-plugin')

// 导出配置对象
module.exports = {

    // 入口
    entry: path.join(__dirname, './src/main.js'),

    // 出口
    output: {
        // 出口目录
        path: path.join(__dirname, "./dist"),
        // 出口文件
        filename: 'bundle.js'
    },
    // 环境
    mode: "development",

    // 插件
    plugins: [
        // 处理 html-webpack-plugin
        new htmlwebpackplugin({
            template: path.join(__dirname, './src/demo.html')
        })
    ],
    // 配置 webpack-dev-server
    // --hot 写在命令行中(因为在这写还需引入别的插件,更麻烦)
    devServer: {
        open: true,   //自动打开浏览器
        port: 8080    //新的端口名
    }


}