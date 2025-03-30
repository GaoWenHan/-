import React from 'react';
import styles from './index.module.css';

export default function Header() {
  const TableTitle = ['商品','单价','数量','小记','操作']
  return (
    <>
        <div className={styles.HeaderTop}>
            <p>全部商品:100</p>
            <ul>
                <li>
                    <input type="checkbox" />全选
                </li>
                {
                    TableTitle.map((item,index)=>{
                        return (
                            <li key={index}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    </>
  )
}
