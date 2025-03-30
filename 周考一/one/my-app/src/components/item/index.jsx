import React from "react";
import styles from "./index.module.css";

import Cart from "../../components/cart";

export default function Item(props) {
  console.log(props);

  return (
    <div className={styles.ShopItem}>
      <div className={styles.ImgBox}>
        <img src={props.Data.imgUrl} />
      </div>
      <div className={styles.ShopNameBox}>{props.Data.shopName}</div>
      <div className={styles.shopItemBottom}>
        <p>¥{props.Data.price}</p>
        <p>
          <Cart />
        </p>
      </div>
    </div>
  );
}
