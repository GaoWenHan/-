import React, { useState } from 'react';
import { Button, Modal,Input } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function AddProject() {
  const { TextArea } = Input;
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();
  const [projectName,setProjectName] = useState('');
  const [description,setDescription] = useState('');
  const handleOk = () => {
   navigate('/layouts')
   console.log(projectName,description);
   
  };
  const handleCancel = () => {
    navigate('/layouts')
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
            <Input placeholder="请输入项目名称" value={projectName} onChange={(event)=>setProjectName(event.target.value)} />
        </p>
        <p>
            项目描述:
            <TextArea 
                rows={4} 
                placeholder="请输入内容" 
                maxLength={100}
                value={description}
                onChange={(event)=>setDescription(event.target.value)}
            />
        </p>
        <p>可见范围</p>
      </Modal>
    </div>
  );
}
