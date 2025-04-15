import React, { useState } from 'react';
import { Input } from 'antd-mobile';
import styles from './index.module.css';
import {DeleteOutline } from 'antd-mobile-icons';

export default function SearchPage() {
  const [historyList, setHistoryList] = useState(() => {
    const store = localStorage.getItem('historyList');
    return store ? JSON.parse(store) : [];
  });
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (event) => {
    if (searchValue === '') return;
    if (event.keyCode === 13) {
      const newHistoryList = [searchValue, ...historyList];
      setHistoryList(newHistoryList);
      localStorage.setItem('historyList', JSON.stringify(newHistoryList));
      setSearchValue('');
    }
  };

  const handleChangeValue = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDelItem =(index) => {
    const newHistoryList = [...historyList];
    newHistoryList.splice(index, 1);
    setHistoryList(newHistoryList);
    localStorage.setItem('historyList', JSON.stringify(newHistoryList));
  }
  return (
    <div className={styles.SearchPage}>
      <div className={styles.SearchInput}>
        <input
          value={searchValue}
          onChange={(event) => handleChangeValue(event)}
          onKeyDown={(event) => handleSearch(event)}
          placeholder="请输入搜索关键词"
        />
      </div>
      <div className={styles.historyListBox}>
        <div className={styles.historyTop}>
            <p>搜索历史</p>
            <p><DeleteOutline style={{fontSize: '20px'}} onClick={()=>{
              localStorage.removeItem('historyList');
              setHistoryList([]);
            }} /></p>
        </div>
        <div className={styles.historyList}>
            {
                historyList.map((item,index)=>{
                    return (
                        <div className={styles.historyItem} key={index}>
                            {item}
                            <p onClick={()=>handleDelItem(index)}>
                                X
                            </p>
                        </div>
                    )
                })
            }
        </div>
      </div>
    </div>
  );
}
