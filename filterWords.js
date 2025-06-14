var fs = require('fs');

var words = [];
fs.readFile('./words.txt','utf-8',function(err, data){
    if (err) throw err;
    fs.writeFile('.wordleWords.js',"const words = ['"+data.replaceAll("\n", "',\n'")+ "']",function(err){
        if (err) throw err;
        console.log('saved!');
    })

})