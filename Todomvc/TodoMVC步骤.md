//-------------通过本地数据存储localStorage----------------
## 一. 从github上引入todo项目的静态页面
    1. (如果没有node_modules文件)安装对应模板文件(css文件..) ==> 查看packgae
    2. npm i 安装 

## 二. 分析结构,划分区域
    1. 分析一个标签的功能需要哪些东西
        1.1 选中状态 , checkked
        1.2 标签名 , name
        1.3 删除时 , id

    2. 新建数据
        data: {
			list: [
				{ id: 1, status: false, name: "屠杀环节" },
				{ id: 2, status: false, name: "旅行环节" },
				{ id: 3, status: true, name: "吸金环节" },
			]
		}

## 三. 配置Vue
    1. 安装vue
    2. 引入vue.js (app.js之前,因为app.js基于vue.js)
    3. 实例化对象vm

## 四. 渲染数据
    1. 把数据渲染到页面上(v-for)
    2. 解决划线, 选中的问题

## 五. 删除单条数据(三种方法)

1. 通过数组的截取方法 splice
    1.1 注册点击事件(@click),通过下标 (传参 index)
    2.1 数组splice(id,1)截取来着一项

2. 通过遍历过滤(filter)出匹配的(不为当前id的), 通过id  √

3. 通过id --> 找到下标(数组遍历的findIndex方法) --> splice


## 六. 添加数据
    1. 要获取input的值,(双向绑定 --> V层新建一个数据inputValue)
    2. 注册键盘事件 keyup,点enter添加
    3. 获取这个数据, 新建id(数组最后一项的id+1,当数组为空时设置默认值) ,和默认状态 --> 保存到数组list中
       (不能为空,在清空val值)

## 七. 修改单项

    1. 注册双击事件 dblclick 
    2. (设置默认数值-1)  --> 判断item.id == 默认值
    3. 改变editing的状态(改变默认值为当前的id值), 打开编辑器   
    4. 注册键盘事件keyup,恢复状态的默认值为 -1 ,关闭编辑器

## 八. 底部的显示和隐藏( v-if / v-show )
    1. 当list.length > 0 时,显示(使用计算属性)

## 九. 底部的显示完成的条数
    1. 过滤出状态为false的数组,求数组长(使用计算属性(状态发生变化时,值就会变))

## 十. clearCompuited 有选中时显示, 删除选中 
    1. 当选中大于一个时,显示clear completed (使用计算属性)
        (数组遍历some,当满足一个或多个时返回true)

## 十一. 数据持久化 ==> 数据保存到本地(localstorage.setItem()) ==> 监听数组变化(保存到本地)
    1. watch 监听器
    2. 保存到localStorage中(转成json格式字符串)
    3. data 中的list也要从本地获取

### (模拟数据接口) axios
// --------通过模拟的接口, 获取数据(json-server 了解即可) -----------
1. 获取数据
    从模拟的服务器接口中,获取数据
    axios.get("地址",{params:{ (具体项)id:2 }}),then(res=>{})

2. 删除数据(通过id)
    1. 传入id
    2. axios.delete
    注意: 删除的是接口中的数据,实例中data没有发生变化(页面不会重新渲染),要过滤实例中的list

3. 保存数据 axios.post
    1.获取输入框中的值,直接获取(因为是双向绑定)
    2.默认会生成id
    3.当数据存入接口后, 实例vm中的data并未发生改变,所以要将数据存入实例的data中

4. 修改数据 axios.patch
    1. 获取id
    2. 获取修改的值(事件对象e的target.value可以获取值)
    注意: 不能用失焦, 按enter会触发两次

5. 修改选中的状态 axios.patch
    1. 获取id(传入id)
    2. 根据id获取list中对应项(find)(状态值取反存入接口)
    (不能使用过滤,过滤返回的是数组,map返回的是元素)

6. 清除选中项
    1. 一次只能删一个(所以要遍历删除)
    2. 获取选中的元素 --> filter
    3. 把他们的id数组中 --> map
    4. 遍历数组, 然后删除
    注意: 删除的是接口中的数据,实例vm的data数据,并没有发生变化(页面不会渲染),
    所以要过滤

