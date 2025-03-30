import React, { useState } from "react";
import { SearchBar, Input } from "antd-mobile";
import styles from "./index.module.css";

export default function SearchBox() {
  const [historyList, setHistoryList] = useState(() => {
    const storeList = localStorage.getItem("historyList");
    return storeList ? JSON.parse(storeList) : null;
  });
  const [searchValue, setSearchValue] = useState("");
  const handleAddStore = (event) => {
    if (event.keyCode === 13) {
      const trimSearchValue = searchValue.trim();
      if (trimSearchValue === "") {
        return;
      }
      let newList = [trimSearchValue, ...historyList];
      if (newList.length > 6) {
        newList = newList.slice(0, 6);
      }
      setHistoryList(newList);
      localStorage.setItem("historyList", JSON.stringify(newList));
      setSearchValue("");
    }
  };
  return (
    <div>
      <div className={styles.SearchTop}>
        <Input
          placeholder="请输入内容"
          value={searchValue}
          onChange={(event) => setSearchValue(event)}
          onKeyDown={(event) => handleAddStore(event)}
        />
      </div>
      <div className={styles.HistoryBox}>
        <p>历史记录</p>
        <ul className={styles.HistoryList}>
          {historyList.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
