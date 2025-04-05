import React, { useEffect, useState } from 'react';
import { Button, Modal, Input,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '@/pages/addProject/index.module.sass';

export default function AddProject() {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [colorsList, setColorsList] = useState([]);
  const [selectColors, setSelectColors] = useState('');

  const fetchColors = async () => {
    try {
      const response = await axios.get('/api/project/Colors');
      const { data } = response.data;
      console.log(data.ColorsData);
      setColorsList(data.ColorsData);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchColors();
  }, []);

  const handleOk = async () => {
    const response = await axios.post('/api/project/addProject',{projectName,colors:selectColors})
    if(response.data.code == 200){
        message.success(response.data.message)
        navigate('/layouts');
    }
  };
  const handleCancel = () => {
    navigate('/layouts');
  };

  const handleSelectColor = (item) => {
    setSelectColors(item.Colors);
  };

  useEffect(()=>{
    if(colorsList.length > 0){
        setSelectColors(colorsList[0].Colors);
    }
  },[colorsList])

  return (
    <div>
      <Modal
        title="创建项目"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          项目名称:
          <Input
            placeholder="请输入项目名称"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            prefix={
              selectColors && (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: selectColors,
                    borderRadius: '50%',
                    marginRight: '8px',
                  }}
                />
              )
            }
          />
        </p>
        <ul
          className={styles.ColorsBox}
          style={{
            width: '100%',
            height: '20px',
            display: 'flex',
            marginTop: '15px',
          }}
        >
          {colorsList.map((item) => {
            return (
              <li
                key={item._id}
                style={{
                  backgroundColor: item.Colors,
                  width: '20px',
                  height: '20px',
                  display: 'block',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
                onClick={() => handleSelectColor(item)}
              ></li>
            );
          })}
        </ul>
        <p style={{ marginTop: '20px' }}>
          项目描述:
          <TextArea
            rows={4}
            placeholder="请输入内容"
            maxLength={100}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </p>
        <p>可见范围</p>
      </Modal>
    </div>
  );
}
