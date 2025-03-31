import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

export default function Layouts() {
  const [shopList, setShopList] = useState([]);
  const [selectItems,setSelectItems] = useState(()=>{
    const store = localStorage.getItem('selectItems');
    return store ? JSON.parse(store) : [];
  })
  const getShopList = async () => {
    let response = await fetch('http://localhost:3000/ShopList');
    let List = await response.json();
    if (response.status === 200) {
      setShopList(List.data);
    } else {
      alert('没有获取到数据');
    }
  };
  useEffect(() => {
    getShopList();
  }, []);

  const handleSelectChange = (item,isChecked) => {
    console.log(isChecked,item);
    
    if(isChecked){
        setSelectItems((prev) => [...prev,item])
    }else{
        setSelectItems((prev) => prev.filter((i) => i._id !== item._id))
    }
  }

  useEffect(()=>{
    localStorage.setItem('selectItems',JSON.stringify(selectItems));
  },[selectItems])
  
  const handleDeleteSelect = () => {
    const newShopList =shopList.filter(item => !selectItems.some(selected => selected._id === item._id));
    setShopList(newShopList);
    setSelectItems([]);
    localStorage.setItem('selectItems',JSON.stringify([]));
  }

  const handleSelectAll = (isChecked) => {
    if(isChecked){
        setSelectItems([...shopList]);
    }else{
        setSelectItems([]);
    }
  }

  useEffect(()=>{
    const updateSelectItems = selectItems.map((item)=>{
        const updateNewItems = shopList.find((shopItem) => shopItem._id === item._id);
        if(updateNewItems){
            return {...item,shopCount:updateNewItems.shopCount}
        }
        return item;
    })
    setSelectItems(updateSelectItems);
    localStorage.setItem('selectItems',JSON.stringify(updateSelectItems));
  },[shopList])
  return (
    <div className={styles.Container}>
      <Header data={shopList} selectData={selectItems} onSelectAll={handleSelectAll}  />
      <Main data={shopList} fetchData={getShopList} selectData={selectItems} onSelectChange={handleSelectChange}  />
      <Footer selectData={selectItems} onDeleteSelect={handleDeleteSelect} />
    </div>
  );
}
