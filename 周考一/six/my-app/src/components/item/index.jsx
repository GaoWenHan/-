import React, { useState } from 'react';
import style from './index.module.css';
import { Stepper } from 'react-vant';
import { useEffect } from 'react';

export default function Item(props) {
  const [isChecked,setIsChecked] = useState(
    props.selectData.some((item) => item._id === props.data._id)
  )
  const handleAddCount = async (event, _id) => {
    let response = await fetch('http://localhost:3000/ChangeCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id, count: event }),
    });
    if (response.status === 200) {
      props.fetchData();
    }
  };

  const handleSelectChange = () => {
    setIsChecked(!isChecked);
    props.onSelectChange(props.data,!isChecked)
  }

  useEffect(()=>{
    setIsChecked(props.selectData.some((item) => item._id === props.data._id))
  },[props.selectData,props.data])

  const handleDelItem = async (_id) => {
    let response = await fetch('http://localhost:3000/DelShopItem',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({_id})
    })
    if(response.status === 200){
      props.fetchData();
      let selectItems = JSON.parse(localStorage.getItem('selectItems')) || [];
      selectItems = selectItems.filter(item => item._id !== _id)
      localStorage.setItem('selectItems',JSON.stringify(selectItems));
      data = await response.json();
      alert(data.message);
    }
  }

  return (
    <>
      <div className={style.ShopItem}>
        <p>
          <input type="checkbox" checked={isChecked} onChange={handleSelectChange}  />
        </p>
        <p>{props.data.shopName}</p>
        <p>{props.data.shopPrice}</p>
        <p>
          <Stepper
            min={1}
            value={props.data.shopCount}
            onChange={(event) => {
              handleAddCount(event, props.data._id);
            }}
          />
        </p>
        <p>{props.data.shopPrice * props.data.shopCount}</p>
        <p onClick={()=>handleDelItem(props.data._id)}>删除</p>
      </div>
    </>
  );
}
