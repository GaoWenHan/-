import React, { useState } from 'react';
import styles from '@/pages/login/index.module.scss';
import SendVerificationCode from '@/components/SendVerificationCode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const changeUserForm = (event) => {
    const { value, name } = event.target;
    setUserForm((prev)=>({
        ...prev,
        [name]:value
    }))
  };

  const handleLogin = async () => {
    try {
        let response = await axios.post('/api/user/login',userForm)
        if(response.data.code == 200){
            navigate('/home')
            alert(response.data.message)
        }
    } catch (error) {
        return error;
    }
  };
  return (
    <div>
      <div className={styles.LoginBox}>
        <ul>
          <li>
            <input
              type="text"
              placeholder="请输入手机号"
              name="username"
              value={userForm.username}
              onChange={(event) => changeUserForm(event)}
            />
            <SendVerificationCode data={userForm.username} />
          </li>
          <li>
            <input
              type="password"
              placeholder="请输入验证码"
              name="password"
              value={userForm.password}
              onChange={(event) => changeUserForm(event)}
            />
          </li>
          <li>
            <input type="button" value="登录" onClick={handleLogin} />
          </li>
        </ul>
      </div>
    </div>
  );
}
