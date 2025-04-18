import React, { useState } from 'react';
import { Search } from 'react-vant';
import { SearchBar } from 'antd-mobile';
import * as styles from './index.module.css';
import { ClockCircleOutline } from 'antd-mobile-icons';

export default function SearchPage() {
  const [searchValue, setSearchValue] = useState('');
  const [historyList, setHistoryList] = useState(() => {
    const store = localStorage.getItem('historyList');
    return store ? JSON.parse(store) : [];
  });

  const handleSearch = () => {
   if(!searchValue.trim()) return;
   const existingIndex = historyList.findIndex(item => item === searchValue);
   let newHistoryList;
   if(existingIndex !== -1) {
    newHistoryList = [
        searchValue,
        ...historyList.filter((_,index)=>index !== existingIndex)
    ];
   }else {
       newHistoryList = [searchValue, ...historyList];
   }
   newHistoryList = newHistoryList.slice(0, 5);
   setHistoryList(newHistoryList);
   localStorage.setItem('historyList', JSON.stringify(newHistoryList));
   setSearchValue('');
  };

  const handleClickIndex = (itemx) => {
    let newHistoryList;
    const existingIndex = historyList.findIndex(item => item === itemx);
    if (existingIndex !== -1) {
        newHistoryList = [
            itemx,
            ...historyList.filter((_, index) => index !== existingIndex)
        ]
        newHistoryList = newHistoryList.slice(0, 5);
        setHistoryList(newHistoryList);
        localStorage.setItem('historyList', JSON.stringify(newHistoryList));
        setSearchValue('');
        return;
    }
    return;
  }

  return (
    <div className={styles.SearchPage}>
      <Search
        value={searchValue}
        onChange={setSearchValue}
        placeholder="请输入搜索关键词"
        onBlur={handleSearch}
      />
      <div className={styles.Title}>
        历史搜索
      </div>
      <div className={styles.HistoryList}>
        {
            historyList.map((item,index)=>{
                return (
                    <div className={styles.HistoryItem} key={index} onClick={()=>handleClickIndex(item)}>
                        <ClockCircleOutline />
                        &nbsp;&nbsp;&nbsp;
                        {item}
                    </div>
                )
            })
        }
        <div className={`${styles.HistoryItemOne} ${styles.HistoryItem}`}>
            清空历史记录
        </div>
      </div>
    </div>
  );
}
