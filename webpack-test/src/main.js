
// const $ = require("jquery")
import $ from "jquery"   
// es6的语法, 不能识别,所以要webpack打包一下,

$("li:odd").css("background", "blue")
$("li:even").css("background", "red")