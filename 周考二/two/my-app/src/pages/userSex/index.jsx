import React, { useState } from 'react';
import styles from './index.module.scss';
import { Form, Selector } from 'react-vant';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';

export default function UserSex() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = location.state || {};
  const [sex, setSex] = useState(profile.sex);
  const options = [
    {
      label: '男',
      value: '男',
    },
    {
      label: '女',
      value: '女',
    },
    {
      label: '保密',
      value: '保密',
    },
  ];

  const handleUpSex = async () => {
    try {
        let response = await axios.post(`/api/user/upSex?_id=${profile._id}&sex=${sex}`)
        if(response.data.code === 200){
            navigate('/home')
        }
    } catch (error) {
        return error;
    }
  }
  return (
    <div className={styles.SexContainer}>
      <div>
        <Selector
            options={options}
            defaultValue={sex}
            style={{
                '--rv-selector-margin': '45px', // 设置外边距为 20px
            }}
            onChange={(arr, extend) => {
                setSex(extend.items[0].value)
            } }
        />
      </div>
      <div className={styles.SexBtn}>
            <button onClick={handleUpSex}>保存</button>
      </div>
    </div>
  );
}
