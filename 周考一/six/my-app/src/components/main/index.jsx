import React, { useState } from 'react';
import Item from '../item';
import styles from './index.module.css';
import { useEffect } from 'react';

export default function Main(props) {
  
  return (
    <>
      <div className={styles.shopMain}>
        <ul className={styles.shopListContiner}>
          {props.data.map((item) => {
            return <Item 
                        key={item._id} 
                        data={item} 
                        fetchData={props.fetchData}
                        selectData={props.selectData}
                        onSelectChange={props.onSelectChange}
                        />;
          })}
        </ul>
      </div>
    </>
  );
}
