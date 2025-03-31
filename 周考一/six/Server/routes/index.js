var express = require('express');
var router = express.Router();
const { ShopList } = require('../config/index');


router.get('/ShopList', async (req, res) => {
  try {
    let data = await ShopList.find();
    res.json({
      code: 200,
      data
    })
  } catch (error) {
    console.log('服务器内部错误', error.message);
    res.json({
      code: 500,
      message: '服务器内部错误'
    })
  }
})

router.post('/ChangeCount', async (req, res) => {
  try {
    const { _id,count } = req.body;
    await ShopList.findByIdAndUpdate(_id,{shopCount:count})
    res.json({
      code:200,
      message:'处理成功'
    })
  } catch (error) {
    console.log('服务器内部错误',error.message);
    res.json({
      code:200,
      message:'服务器内部错误'
    })
  }
})


router.post('/DelShopItem',async (req,res)=>{
  try {
    const { _id } = req.body;
    await ShopList.deleteOne({_id})
    res.json({
      code:200,
      message:'删除成功'
    })
  } catch (error) {
    console.log('服务器内部错误',error.message);
    res.json({
      code:500,
      message:'服务器内部错误'
    })
  }
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
