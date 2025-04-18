import React, { useState ,useEffect} from 'react';
import * as styles from './index.module.css';
import { Search } from 'react-vant';
import { useNavigate } from 'react-router-dom';
import CateAll from '../../components/CateAll/index.jsx'
import axios from 'axios';
import { InfiniteScroll } from 'antd-mobile'
import { sleep } from 'antd-mobile/es/utils/sleep'


export default function Home() {
  const navigate = useNavigate();
  const cateList = [
    '首页',
    '动画',
    '番剧',
    '国创',
    '音乐',
    '舞蹈',
    '游戏',
    '知识',
    '科技',
    '运动',
    '汽车',
    '生活',
    '美食',
    '动物园',
    '鬼畜',
    '时尚',
    '娱乐',
    '影视',
    '纪录片',
    '电影',
    '电视剧',
    '直播',
    '相扑',
    '课堂',
  ];
  const [videoList,setVideoList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleGoSearch = () => {
    navigate('/search');
  };

  const handleClickActive = (index) => {
    setActiveIndex(index);
  }

  const getVideoList = async () => {
    const response = await axios.get('/api/video/List',{
        params:{
            page,
            pageSize
        }
    });
    const newData = response.data.data.result;
    if(newData && newData.length > 0){
        await sleep(3000);
        const uniqueNewData = newData.filter((newItem)=>{
            return !videoList.some((Item) => Item._id === newItem._id);
        })
        setVideoList((prev)=>[...prev,...uniqueNewData]);
        setPage(prev=>prev+1);
        setHasMore(newData.length === pageSize);
    }else{
        setHasMore(false);
    }
  }

  useEffect(() => {
      getVideoList();
  },[])


  return (
    <div className={styles.HomeContainer}>
      <Search
        clearable
        onFocus={handleGoSearch}
        placeholder="请输入搜索关键词"
      />
      <div className={styles.CateBox}>
        <div className={styles.CateLeft}>
          {cateList.map((item, index) => {
            return (
              <div 
                key={index} 
                className={activeIndex === index ? styles.active : styles.CateItem}
                onClick={()=>handleClickActive(index)}
                >
                {item}
              </div>
            );
          })}
        </div>
        <div className={styles.CateRight}>
            <CateAll/>
        </div>
      </div>
      <div className={styles.VideoBox}>
          {videoList.map((item)=>{
            return (
                <div className={styles.VideoItem} key={item._id}>

                </div>
            )
          })}
      </div>
      <InfiniteScroll loadMore={getVideoList} hasMore={hasMore} />
    </div>
  );
}
