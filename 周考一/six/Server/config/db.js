const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mySix')
.then(()=>{
    console.log('连接成功');
})
.catch(error=>{
    console.log('连接失败',error);
})

module.exports = mongoose;