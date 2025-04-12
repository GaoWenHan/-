import React, { useState, useEffect } from 'react';
import styles from '@/pages/home/index.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DatetimePicker, Field, Toast ,Cascader} from 'react-vant';


export default function Home() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState(new Date());
  const [birStatus,setBirStauts] = useState(false);

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
    today.setHours(0, 0, 0, 0,0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0,0);

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
                value={birStatus ? date.toLocaleDateString('zh-CN', { 
                    year: 'numeric', 
                    month: '2-digit', 
                    day: '2-digit' 
                  }) :
                profile.birthday} 
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
          <div>adhk</div>
        </div>
      </div>
    </div>
  );
}
