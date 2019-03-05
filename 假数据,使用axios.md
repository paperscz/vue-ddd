一.假数据的接口服务器
1. `json-server` 
    指定一个json文件, 提供一个接口服务器, 就能使用本地的假数据了

2. 安装 npm i json-server -g (当成工具使用)
   准备json文件
   启动 json-server data.json(json文件名)

3. 遵循 REST API 格式
    增 POST
        http://localhost:3000/list
        { "name" : "飞飞", "age" : 80 } 

    删 DELETE
        http://localhost:3000/list/2

    改 PUT / PATCH 
        http://localhost:3000/list/2
        { "name" : "王五", "age" : 30 }

        PUT : { "name" : "王五", "age" : 40 } 要把之前不改的也要发送过去(是覆盖的形式)
        PATCH : { age : 40 }      哪里修改,改哪里

    查 GET
        查看全部 : http://localhost:3000/list
        查看具体 : http://localhost:3000/list/2  --> id=2


二. axios (是一个发送请求库)
    1. 以promise为基础的http客户端,适用于: 浏览器和nodejs
    封装ajax,用来发送请求,异步获取数据

    2. 安装 npm i axios
       引入src
       