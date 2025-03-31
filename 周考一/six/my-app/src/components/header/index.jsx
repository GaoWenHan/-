import React from 'react';
import styles from './index.module.css';

export default function Header(props) {
  const TableTitle = ['商品','单价','数量','小记','操作'];
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    props.onSelectAll(isChecked);
  }
  return (
    <>
        <div className={styles.HeaderTop}>
            <p>全部商品:{props.data.length}</p>
            <ul>
                <li>
                    <input type="checkbox" checked={props.data.length === props.selectData.length} onChange={handleSelectAll}  />全选
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
