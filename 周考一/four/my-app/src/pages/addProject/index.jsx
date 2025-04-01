import React, { useEffect, useState } from 'react';
import { Button, Modal, Input } from 'antd';
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

  const handleOk = () => {
    navigate('/layouts');
    console.log(projectName, description);
  };
  const handleCancel = () => {
    navigate('/layouts');
  };

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
          />
        </p>
        <ul className={styles.ColorsBox} style={{width:'100%',height:'20px',display:'flex',marginTop:'15px'}}>
          {colorsList.map((item) => {
            return <li key={item._id} style={{backgroundColor:item.Colors,width:'20px',height:'20px',display:"block",borderRadius:"50%",marginRight:'5px'}}>

            </li>;
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
