import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '@/pages/detail/index.module.sass';
import axios from 'axios';
import { Tabs, Card, Input, Button, Progress } from 'antd';
import {
  RadarChartOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';

export default function Detail() {
  const { id } = useParams();
  const [projectItem, setProjectItem] = useState({});
  const [addListStatus, setAddListStatus] = useState(false);
  const [listName, setListName] = useState('');
  const [ListData, setListData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [addItemStatus, setAddItemStatus] = useState({});
  const [itemName, setItemName] = useState('');

  const getProjectItem = async () => {
    try {
      let response = await axios.get(`/api/project/Detail?id=${id}`);
      if (response.data.code === 200) {
        const { data } = response.data;
        setProjectItem(data.ProjectItem);
        setListData(data.ListData);
        setItemData(data.ItemData);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getProjectItem();
    setAddListStatus(false);
    setListName('');
  }, [id]);

  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: '任务板',
    },
    {
      key: '2',
      label: '附件',
    },
    {
      key: '3',
      label: '任务统计',
    },
    {
      key: '4',
      label: '归档任务',
    },
  ];

  const handleAddList = async () => {
    try {
      let response = await axios.post('/api/project/addList', {
        ListName: listName,
        LId: id,
      });
      if (response.data.code === 200) {
        getProjectItem();
        setAddListStatus(false);
        setListName('');
      }
    } catch (error) {
      return error;
    }
  };

  const handleAddItem = async (_id) => {
    try {
      let response = await axios.post('/api/project/addItem', {
        ItemName: itemName,
        ItId: _id,
      });
      if (response.data.code == 200) {
        getProjectItem();
        setAddItemStatus({});
        setItemName('');
      }
    } catch (error) {
      return error;
    }
  };

  const handleAddItemStatus = (itemId) => {
    setAddItemStatus((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const getItemList = (_id) => {
    return itemData.filter((item) => item.ItId === _id);
  };

  const getItemLength = (_id) => {
    const filteredData = itemData.filter((itemy) => itemy.ItId === _id);
    return filteredData.length;
  };

  const getItemStatus = (_id) => {
    const filteredData = itemData.filter((itemy) => itemy.ItId === _id && itemy.status === true);
    return filteredData.length;
  };

  const handleCheckboxChange = (itemId, newStatus) => {
    setItemData((prevItemData) =>
      prevItemData.map((item) =>
        item._id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <div>
      <div className={styles.ResultTop}>
        <div className={styles.Top}>
          <p>
            <RadarChartOutlined />
            &nbsp;
            {projectItem.projectName}
          </p>
        </div>
        <div className={styles.Bottom}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
        <div className={styles.CartBox}>
          {ListData.map((item) => {
            const totalItems = getItemLength(item._id);
            const completedItems = getItemStatus(item._id);
            const progressPercent = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

            return (
              <Card
                key={item._id}
                style={{
                  width: 240,
                  borderRadius: '0px',
                }}
              >
                <p
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>
                    {item.ListName}
                    <p>{`${completedItems} / ${totalItems}`}</p>
                  </p>
                  <p>
                    <EllipsisOutlined />
                  </p>
                </p>
                <p>
                  <Progress percent={progressPercent} />
                </p>
                <p>
                  {getItemList(item._id).map((itemx) => {
                    return (
                      <p
                        key={itemx._id}
                        style={{
                          display: 'flex',
                          margin: '5px 0px 5px 0px',
                          width: '100%',
                          height: '40px',
                          lineHeight: '40px',
                          textIndent: '10px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                        }}
                      >
                        <p>
                          <input
                            type="checkbox"
                            checked={itemx.status}
                            onChange={(event) =>
                              handleCheckboxChange(itemx._id, event.target.checked)
                            }
                          />
                        </p>
                        &nbsp;&nbsp;
                        <p>{itemx.ItemName}</p>
                      </p>
                    );
                  })}
                </p>
                <p style={{ marginTop: '10px' }}>
                  {!addItemStatus[item._id] ? (
                    <p onClick={() => handleAddItemStatus(item._id)}>
                      <PlusOutlined />
                      新建任务
                    </p>
                  ) : (
                    <p>
                      <Input
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}
                      />
                      <p style={{ marginLeft: '55px', marginTop: '10px' }}>
                        <Button
                          type="primary"
                          onClick={() => handleAddItem(item._id)}
                        >
                          保存
                        </Button>
                        &nbsp;
                        <Button onClick={() => setAddItemStatus({})}>
                          取消
                        </Button>
                      </p>
                    </p>
                  )}
                </p>
              </Card>
            );
          })}
          <Card
            style={{
              width: 240,
              borderRadius: '0px',
            }}
          >
            {!addListStatus ? (
              <p onClick={() => setAddListStatus(true)}>
                <PlusOutlined />
                新建列表
              </p>
            ) : (
              <p>
                <Input
                  value={listName}
                  onChange={(event) => setListName(event.target.value)}
                />
                <p style={{ marginLeft: '55px', marginTop: '10px' }}>
                  <Button type="primary" onClick={handleAddList}>
                    保存
                  </Button>
                  &nbsp;
                  <Button onClick={() => setAddListStatus(false)}>取消</Button>
                </p>
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}    