import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import { SearchBar } from "antd-mobile";
import { Sticky } from "react-vant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InfiniteScroll, Button } from "antd-mobile";
import { sleep } from "antd-mobile/es/utils/sleep";
import { TruckOutline } from "antd-mobile-icons";

export default function Home() {
  const navigate = useNavigate();
  const cateList = ["女装", "男装", "童装", "婴幼儿", "运动", "限时特惠"];
  const [activeIndex, setActive] = useState(0);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [sortPrice, setSortPrice] = useState(0);
  const dataRef = useRef(true);
  async function loadMore() {
    const append = await axios.get("/api/shop/shopList", {
      params: {
        page,
        pageSize,
      },
    });
    const newData = append.data.data;
    if (newData && newData.length > 0) {
      await sleep(3000);
      const uniqueShopData = newData.filter((newItem) => {
        return !data.some((item) => item._id === newItem._id);
      });
      setData((val) => [...val, ...uniqueShopData]);
      setPage((prev) => prev + 1);
      setHasMore(newData.length === pageSize);
    } else {
      setHasMore(false);
    }
  }

  useEffect(() => {
    if (!dataRef.current) {
      loadMore();
      dataRef.current = false;
    }
  }, []);

  const handelCate = (index) => {
    setActive(index);
  };

  const getFilterShop = () => {
    return data.filter((item) => item.cate === cateList[activeIndex]);
  };

  const handlClickSort = () => {
    switch (sortPrice) {
      case 0:
        setSortPrice(1);
        return data;
      case 1:
        setSortPrice(2);
        const newDataOne = data.sort((a, b) => {
          return a.price - b.price;
        });
        setData(newDataOne);
        break;
      case 2:
        setSortPrice(0);
        const newDataTwo = data.sort((a, b) => {
          return b.price - a.price;
        });
        setData(newDataTwo);
        break;
      default:
        setSortPrice(0);
        return data;
    }
  };

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
                  onClick={() => handelCate(index)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          <div className={styles.PriceBox}>
            <Button color="primary" fill="outline" onClick={handlClickSort}>
              价格
            </Button>
          </div>
        </div>
      </Sticky>
      <div className={styles.ShopListBox}>
        {getFilterShop().map((item) => {
          return (
            <div key={item._id} className={styles.ShopItem}>
              <div className={styles.ImgBox}>
                <img src={item.imgUrl} />
              </div>
              <div className={styles.ShopNameBox}>{item.shopName}</div>
              <div className={styles.shopItemBottom}>
                <p>¥{item.price}</p>
                <p>
                  <TruckOutline style={{ fontSize: "20px" }} />
                </p>
              </div>
            </div>
          );
        })}
        <div className={styles.InfiniteBox}>
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
      </div>
    </div>
  );
}
