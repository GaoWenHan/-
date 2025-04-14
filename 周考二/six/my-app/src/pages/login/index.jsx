import React, { useState } from 'react';
import styles from './index.module.scss';
import Password from 'antd/es/input/Password';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {  Toast } from 'react-vant';

export default function Login() {
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const ChangeLoginForm = (event) => {
    const { name, value } = event.target;
    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin =  async () => {
    try {
        let response = await axios.post('/api/article/login',userForm)
        if(response.data.code === 200){
            localStorage.setItem('token',response.data.data.token)
            Toast('登录成功 ')
            navigate('/home')
        }
    } catch (error) {
        
    }
  };
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginBox}>
        <ul>
          <li>
            <input
              type="text"
              placeholder="请输入手机号"
              name="username"
              value={userForm.username}
              onChange={(event) => {
                ChangeLoginForm(event);
              }}
            />
          </li>
          <li>
            <input
              type="password"
              placeholder="请输入密码"
              name="password"
              value={userForm.password}
              onChange={(event) => {
                ChangeLoginForm(event);
              }}
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
