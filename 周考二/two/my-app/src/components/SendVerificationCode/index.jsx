import React, { useState } from 'react';
import styles from '@/components/SendVerificationCode/index.module.scss';
import debounce from './utils/debounce';


export default function SendVerificationCode(props) {
  const [second, setSecond] = useState(0);
  const handleSendCode = debounce(() => {
    let timer;
    let PhoneRegex = /^1[3-9]\d{9}$/;
    if(!PhoneRegex.test(props.data)){
        alert('手机号不合法');
        return;
    }
    if (second === 0) {
      setSecond(60);
      timer = setInterval(() => {
        setSecond((prevSecond) => {
          const newSecond = prevSecond - 1;
          if (newSecond <= 0) {
            clearInterval(timer);
          }
          return newSecond;
        });
      }, 1000);
    }
  }, 300);
  return (
    <div>
      <p className={styles.CodeBox} onClick={handleSendCode}>
        {second > 0 ? `倒计时${second}` : '获取验证码'}
      </p>
    </div>
  );
}
