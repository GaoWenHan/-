import React, { useState, useEffect } from 'react';
import { Search, Sticky } from 'react-vant';
import * as styles from './index.module.css';
import { Popup } from '@nutui/nutui-react';
import { Drawer } from 'antd';

export default function Home() {
  const [shopList, setShopList] = useState([]);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('right');
  const getShopList = async () => {
    const response = await fetch('/api/shop/list');
    const data = await response.json();
    if (data.code === 200) {
      setShopList(data.data);
    }
  };

  useEffect(() => {
    getShopList();
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <div className={styles.HomeContainer}>
      <Sticky>
        <div className={styles.HeaderTop}>
          <Search clearable placeholder="请输入搜索关键词" />
          <div className={styles.FilterShop}>
            <p>销量</p>
            <p>价格</p>
            <p onClick={showDrawer}>筛选</p>
          </div>
        </div>
      </Sticky>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
      <div className={styles.ShopListContent}>
        {shopList.map((item) => {
          return (
            <div className={styles.ShopItem} key={item._id}>
              <div className={styles.ShopImg}>
                <img src={item.shopImg} alt="" />
              </div>
              <div className={styles.ShopInfo}>
                <p>{item.shopName}</p>
                <p>{item.shopPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
