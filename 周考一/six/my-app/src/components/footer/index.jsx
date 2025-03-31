import React from 'react';
import styles from './index.module.css';

export default function Footer(props) {
  const handleDelSelect = () => {
    props.onDeleteSelect()
  };
  const getShopCount = () => {
    return props.selectData.reduce((a,b)=>{
        return a + b.shopPrice * b.shopCount;
    },0)
  }
  return (
    <>
      <div className={styles.FooterBox}>
        <div className={styles.Left}>
          <button onClick={handleDelSelect}>删除选中商品</button>
        </div>
        <div className={styles.Right}>
          <p>已选中商品{props.selectData.length}件,总计{getShopCount()}</p>
        </div>
      </div>
    </>
  );
}
