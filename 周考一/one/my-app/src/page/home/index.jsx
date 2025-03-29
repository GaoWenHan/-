import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { SearchBar } from "antd-mobile";
import { Sticky } from "react-vant";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { InfiniteScroll} from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';

export default function Home() {
  const navigate = useNavigate();
  const cateList = ["女装", "男装", "童装", "婴幼儿", "运动", "限时特惠"];
  const [activeIndex, setActive] = useState(0);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSize] = useState(6);
  const dataRef = useRef();
  async function loadMore() {
    const append = await axios.get('/api/shop/shopList',
      {
        params:{
          page,
          pageSize
        }
      }
    )
    const newData = append.data.data;
    if(newData && newData.length > 0){
      setData(val => [...val, ...newData]);
      setPage(prev => prev + 1);
      setHasMore(newData.length === pageSize)
    }else{
      setHasMore(false)
    }
  }

  console.log(data);
  
  useEffect(()=>{
    if(!dataRef.current){
      loadMore();
    }
  },[])
  return (
    <div>
      <Sticky>
        <div className={styles.HeaderBox}>
          <SearchBar
            placeholder="请输入内容"
            onFocus={() => navigate("/search")}
          />
          <ul className={styles.CateBox}>
            {cateList.map((item, index) => {
              return (
                <li
                  key={index}
                  className={activeIndex === index ? styles.active : null}
                  onClick={() => setActive(index)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </Sticky>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}
