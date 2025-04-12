import React,{useState} from 'react'
import { useParams,useLocation,useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import axios from 'axios';

export default function UserEdit() {
  const location = useLocation();
  const { profile } = location.state || {};
  const [updateName, setUpdateName] = useState(profile ? profile.name : '');
  const navigate = useNavigate();
  const handleChangeName = (event) => {
    setUpdateName(event.target.value);
  }
  
  const handleUpdateName = async () => {
    try {
        let response = await axios.post(`/api/user/upName?_id=${profile._id}&name=${updateName}`)
        if(response.data.code===200){
            navigate('/home')
        }
    } catch (error) {
        return error;
    }
  }
  return (
    <div className={styles.EditBox}>
        <div className={styles.EditInputBox}>
            <input type="text" value={updateName} onChange={(event)=>handleChangeName(event)} />
        </div>
        <div className={styles.SaveBtn}>
            <button onClick={handleUpdateName}>保存</button>
        </div>
    </div>
  )
}
