var exec = require('child_process').exec;

// Hexo 3 用户复制这段
hexo.on('new', function(data){
  exec('start D:\\ruanjian\\SublimeText3\\sublime_text.exe ' + data.path);
});