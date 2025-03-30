import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className={styles.warseBox}>
        <div className={styles.HeaderTop}>
          <Button 
            onClick={showModal}
            style={{
                width:'100px',
                height:'45px'
            }}
            ><PlusOutlined />添加</Button>
        </div>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    </>
  );
}
