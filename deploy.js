const path = require("path");
const swig = require("swig");
const ora = require("ora");
const fs = require("hexo-fs");
const util = require("hexo-util");
const spawn = util.spawn;

function () {
	fs.exist(deployDir).then(function (exist) {
		if (exist) {
			ora('移除编译源目录').info();
			return clear();
		}
	}).then(() => ora('开始打包...').info())
	  .then(() => build())
	  .then(() => ora('初始化GitHub').info())
	  .then(() => setup())
	  .then(() => ora(`上传代码：【${config.github.url}】: ${config.github.branch}`).info())
	  .then(() => push(config.github))
	  .then(() => ora(`上传成功！${moment().format("YYYY-MM-DD HH:mm:ss")}`).info())
	  .then(() => spawn("rm", ["-rf"], deployDir));

}

main();
