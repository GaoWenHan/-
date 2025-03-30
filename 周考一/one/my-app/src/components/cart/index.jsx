import React, { useState } from "react";
import { TruckOutline } from "antd-mobile-icons";
import styles from "./index.module.css";
import { ActionSheet } from "antd-mobile";

export default function Cart() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TruckOutline
        style={{ fontSize: "20px" }}
        onClick={() => setVisible(true)}
      />
      <div className={styles.CartBox}>
        <ActionSheet
          visible={visible}
          actions={[]}
          onClose={() => setVisible(false)}
        />
      </div>
    </>
  );
}
