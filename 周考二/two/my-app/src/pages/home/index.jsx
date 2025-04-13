import React, { useState, useEffect } from 'react';
import styles from '@/pages/home/index.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DatetimePicker, Field, Toast, Cascader } from 'react-vant';
import { Cascader as AntdCascader, Button, Space } from 'antd-mobile';
// import { DemoBlock, DemoDescription } from 'demos'

export default function Home() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState(new Date());
  const [birStatus, setBirStauts] = useState(false);
  const [visible, setVisible] = useState(false);
  const options = [
    {
      label: '浙江',
      value: '浙江',
      children: [
        {
          label: '杭州',
          value: '杭州',
          children: [
            {
              label: '西湖区',
              value: '西湖区',
            },
            {
              label: '上城区',
              value: '上城区',
            },
            {
              label: '余杭区',
              value: '余杭区',
            },
          ],
        },
        {
          label: '温州',
          value: '温州',
          children: [
            {
              label: '鹿城区',
              value: '鹿城区',
            },
            {
              label: '龙湾区',
              value: '龙湾区',
            },
            {
              label: '瓯海区',
              value: '瓯海区',
            },
          ],
        },
        {
          label: '宁波',
          value: '宁波',
          children: [
            {
              label: '海曙区',
              value: '海曙区',
            },
            {
              label: '江北区',
              value: '江北区',
            },
            {
              label: '镇海区',
              value: '镇海区',
            },
          ],
        },
      ],
    },
    {
      label: '安徽',
      value: '安徽',
      children: [
        {
          label: '合肥',
          value: '合肥',
          children: [
            {
              label: '包河区',
              value: '包河区',
            },
            {
              label: '蜀山区',
              value: '蜀山区',
            },
            {
              label: '瑶海区',
              value: '瑶海区',
            },
          ],
        },
        {
          label: '芜湖',
          value: '芜湖',
          children: [
            {
              label: '镜湖区',
              value: '镜湖区',
            },
            {
              label: '弋江区',
              value: '弋江区',
            },
            {
              label: '湾沚区',
              value: '湾沚区',
            },
          ],
        },
      ],
    },
    {
      label: '江苏',
      value: '江苏',
      children: [
        {
          label: '南京',
          value: '南京',
          children: [
            {
              label: '玄武区',
              value: '玄武区',
            },
            {
              label: '秦淮区',
              value: '秦淮区',
            },
            {
              label: '建邺区',
              value: '建邺区',
            },
          ],
        },
        {
          label: '苏州',
          value: '苏州',
          children: [
            {
              label: '虎丘区',
              value: '虎丘区',
            },
            {
              label: '吴中区',
              value: '吴中区',
            },
            {
              label: '相城区',
              value: '相城区',
            },
          ],
        },
      ],
    },
  ];

  const getProfileText = async () => {
    try {
      let response = await axios.get('/api/user/profile');
      if (response.data.code === 200) {
        setProfile(response.data.data.result[0]);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  };

  useEffect(() => {
    getProfileText();
  }, []);

  const handleConfirmDate = async (date) => {
    setBirStauts(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0, 0);

    if (selectedDate >= today) {
      Toast('只能选择当天时间之前的日期');
      return;
    }

    setBirthDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    let response = await axios.post(
      `/api/user/uBirthday?_id=${profile._id}&birthDate=${formattedDate}`,
    );
    if (response.data.code === 200) {
      Toast(response.data.message);
      setBirStauts(false);
      getProfileText();
      return;
    }
  };

  const handleChange = (values,selectedOptions) => {
    console.log(values,selectedOptions);
    
  }

  return (
    <div className={styles.HomeBox}>
      <div className={styles.TextContainer}>
        <div className={styles.PrileItem}>
          <div>昵称</div>
          <div
            onClick={() => {
              if (profile) {
                navigate(`/userEdit`, { state: { profile: profile } });
              }
            }}
          >
            {profile.name}
          </div>
        </div>
        <div className={styles.PrileItem}>
          <div>性别</div>
          <div
            onClick={() => {
              if (profile) {
                navigate(`/userSex`, { state: { profile: profile } });
              }
            }}
          >
            {profile.sex}
          </div>
        </div>
        <div className={styles.PrileItem}>
          <div>出生日期</div>
          <DatetimePicker
            popup={{
              round: true,
            }}
            type="date"
            format="YYYY-MM-DD"
            minDate={new Date(1900, 0, 1)}
            maxDate={new Date()}
            value={birthDate}
            onConfirm={handleConfirmDate}
          >
            {(date, _, actions) => (
              <Field
                readOnly
                clickable
                value={
                  birStatus
                    ? date.toLocaleDateString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : profile.birthday
                }
                style={{
                  width: '120px',
                }}
                placeholder="请选择出生日期"
                onClick={actions.open}
                className={styles.dateField}
              />
            )}
          </DatetimePicker>
        </div>
        <div className={styles.PrileItem}>
          <div>所在城市</div>
          <div
            onClick={() => {
              setVisible(true);
            }}
          >
            {/* {selectedCity} */}
            123321
          </div>
        </div>
      </div>
      <AntdCascader
        options={options}
        visible={visible}
        onChange={handleChange}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
