import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import axios from 'axios';
import { message, Dropdown } from 'antd';

export default function Home() {
  const [addStatus, setAddStatus] = useState(false);
  const [addStatusB, setAddStatusB] = useState(false);
  const [title, setTitle] = useState('');
  const [articleA, setArticleA] = useState([]);
  const [selectId, setSelectId] = useState(0);
  const [articleB, setArticleB] = useState([]);

  const handleDeleteArticleA = async (_id) => {
    try {
      let response = await axios.post(`/api/article/deleteArticleA?id=${_id}`);
      if (response.data.code === 200) {
        message.success(response.data.message);
        getArticleA();
      }
    } catch (error) {
      return error;
    }
  };

  const items = (_id) => [
    {
      key: '1',
      label: <p onClick={() => handleDeleteArticleA(_id)}>删除文集</p>,
    },
    {
      key: '2',
      label: <a>2nd menu item</a>,
    },
    {
      key: '3',
      label: <a>3rd menu item</a>,
    },
  ];

  const getArticleA = async () => {
    try {
      let response = await axios.get('/api/article/articleA');
      if (response.data.code === 200) {
        setArticleA(response.data.data.result);
      }
    } catch (error) {
      return error;
    }
  };

  const getArticleB = async () => {
    try {
      let response = await axios.get('/api/article/articleB');
      if (response.data.code === 200) {
        setArticleB(response.data.data.result);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getArticleA();
    getArticleB();
  }, []);

  const addArticleA = async () => {
    try {
      let response = await axios.post(
        `/api/article/addArticleA?title=${title}`,
      );
      if (response.data.code === 200) {
        setAddStatus(!addStatus);
        setTitle('');
        getArticleA();
        message.success(response.data.message);
      }
    } catch (error) {
      return error;
    }
  };

  const getArticleBList = () => {
    return articleB.filter((item) => item.articleAId === articleA[selectId]._id)
  }

  return (
    <div className={styles.HomeContainer}>
      <div className={styles.One}>
        <div
          className={styles.AddArtilceABox}
          onClick={() => {
            setAddStatus(!addStatus);
          }}
        >
          <PlusOutlined />
          &nbsp; 新建文集
        </div>
        {addStatus ? (
          <div className={styles.ArticleAInput}>
            <p>
              <input
                type="text"
                placeholder="请输入文集名"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </p>
            <p>
              <button onClick={addArticleA}>确认</button>
              <button
                onClick={() => {
                  setAddStatus(!addStatus);
                  setTitle('');
                }}
              >
                取消
              </button>
            </p>
          </div>
        ) : null}
        <div className={styles.ArticleList}>
          {articleA.map((item, index) => {
            return (
              <div
                key={item._id}
                className={
                  selectId === index
                    ? styles.activeArticleA
                    : styles.ArticleItem
                }
                onClick={() => {
                  setSelectId(index);
                }}
              >
                <p style={{ color: 'white' }}>{item.title}</p>
                <p style={{ color: 'white' }}>
                  {selectId === index ? (
                    <Dropdown
                      menu={{
                        items: items(item._id),
                      }}
                      placement="bottomLeft"
                    >
                      <SettingOutlined />
                    </Dropdown>
                  ) : null}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.Two}>
        <div className={styles.ArticleBList}>
          {getArticleBList().map((item) => {
            return (
              <div className={styles.ArticleBItem} key={item._id}>
                <div>
                  <p>{item.title}</p>
                  <p>{item.content.slice(0, 8)}</p>
                </div>
                <div>
                  <SettingOutlined />
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={styles.AddArtilceBBox}
          onClick={() => {
            setAddStatusB(!addStatusB);
          }}
        >
          <PlusOutlined />
          &nbsp; 新建文集
        </div>
      </div>
      <div className={styles.Three}></div>
    </div>
  );
}
