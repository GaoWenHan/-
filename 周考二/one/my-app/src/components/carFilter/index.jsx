import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

export default function CarFilter({ filterHistory,onDelete }) {
  return (
    <>
      <div className={styles.carAllFilter}>
        <div className={styles.FilterItem} style={{ border: 'none' }}>
          当前筛选
        </div>
        <div 
            className={styles.FilterItem} 
            style={{ border: 'none' }}
            onClick={()=>{
                localStorage.removeItem('filterHistory');
                window.location.reload();
            }}
        >
            清空筛选
        </div>
        {filterHistory.price && (
          <p className={styles.FilterItem} style={{ marginRight: '10px' }}>
            {filterHistory.price}
            <span
                onClick={()=>{
                    onDelete('price',filterHistory.price)
                }}
                >X
            </span>
          </p>
        )}
        {filterHistory.brands.length > 0
          ? filterHistory.brands.map((brand, index) => (
              <p
                key={index}
                className={styles.FilterItem}
                style={{ marginRight: '10px' }}
              >
                {brand}
                <span
                    onClick={()=>{
                        onDelete('brand',brand)
                    }}
                >X
                </span>
              </p>
            ))
          : null}
        {filterHistory.serise.length > 0
          ? filterHistory.serise.slice(0, 6).map((series, index) => (
              <p
                key={index}
                className={styles.FilterItem}
                style={{ marginRight: '10px' }}
              >
                {series.slice(0, 15)}
                <span
                    onClick={()=>{
                        onDelete('serise',series)
                    }}
                    >X
                </span>
              </p>
            ))
          : null}
      </div>
    </>
  );
}
