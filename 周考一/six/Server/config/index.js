const mongoose = require('../config/db');

const ShopSchema = new mongoose.Schema({
    shopName:String,
    shopPrice:Number,
    shopCount:Number
})

const ShopList = mongoose.model('ShopList',ShopSchema,'ShopList');
module.exports = {
    ShopList
}