import React, { useState } from "react";
import styles from "./index.module.css";
import { SearchBar } from "antd-mobile";
import { Sticky } from "react-vant";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const cateList = ["女装", "男装", "童装", "婴幼儿", "运动", "限时特惠"];
  const [activeIndex, setActive] = useState(0);
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
    </div>
  );
}
