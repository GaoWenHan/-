import React, { useState } from "react";
import styles from "./index.module.css";
import { Button, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import pinyin from "pinyin";

export default function WareHouse() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [warseForm, setWarseForm] = useState({
    name: "",
    code: "",
    warseId: "",
    Iphone: "",
  });
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChangeValue = (event) => {
    const { name, value } = event.target;
    setWarseForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleNameBlur = () => {
    const { name, code } = warseForm;
    if (!code && name) {
      const firstLetters = pinyin(name, {
        style: pinyin.STYLE_FIRST_LETTER,
      }).map(item => item[0]).join("");
      setWarseForm((prev) => ({
        ...prev,
        code: firstLetters.toUpperCase(),
      }));
    }
  };
  return (
    <>
      <div className={styles.warseBox}>
        <div className={styles.HeaderTop}>
          <Button
            onClick={showModal}
            style={{
              width: "100px",
              height: "45px",
            }}
          >
            <PlusOutlined />
            添加
          </Button>
        </div>
        <Modal
          title="添加仓库"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            仓库名称:
            <Input
              onBlur={handleNameBlur}
              value={warseForm.name}
              onChange={handleChangeValue}
              name="name"
            />
          </p>
          <p>
            助记码:
            <Input name="code" value={warseForm.code} disabled />
          </p>
          <p>
            所属部门:
            <Input name="warseId" />
          </p>
          <p>
            联系电话:
            <Input name="Iphone" />
          </p>
        </Modal>
      </div>
    </>
  );
}
