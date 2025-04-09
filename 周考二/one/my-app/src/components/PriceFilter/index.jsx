import React, { useState,useEffect } from 'react';
import styles from './index.module.scss';

export default function PriceFilter(props) {
  const priceList = [
    '不限',
    '0-3万',
    '3-5万',
    '5-10万',
    '10-15万',
    '15-20万',
    '20-30万',
    '30万以上',
  ];
  const [priceActive,setPriceActive] = useState(0);

  const handleSortCart = (index) => {
    setPriceActive(index)
    props.CarData(priceList[index])
  }

  useEffect(()=>{
    props.CarData(priceList[priceActive])
  },[])
  return (
    <>
      <div className={styles.filterPrice}>
        <div className={styles.priceItem}>价&nbsp;&nbsp;格:</div>
        {priceList.map((item, index) => {
          return (
            <div
              className={
                priceActive === index ? styles.activePrice : styles.priceItem
              }
              key={index}
              onClick={() => {
                handleSortCart(index)
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
