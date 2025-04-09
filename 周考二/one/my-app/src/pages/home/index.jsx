import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import axios from 'axios';

export default function Home() {
  const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(i + 65));
  const priceList = [
    '不限',
    '0-3万',
    '3-5万',
    '5-10万',
    '10-15万',
    '15-20万',
    '20-30万',
    '30万以上',
  ];
  const [alphActive, setAlphActive] = useState('热门');
  const [vehicleActive, setVehicleActive] = useState(0);
  const [brands, setBrands] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [selectBrandId, setSelectBrandId] = useState('');

  const getBrands = async () => {
    try {
      let response = await axios.get('/api/car/brand');
      if (response.data.code == 200) {
        setBrands(response.data.data.result);
      }
    } catch (error) {
      return error;
    }
  };

  const getVehicle = async () => {
    try {
      let response = await axios.get('/api/car/vehicle');
      if (response.data.code == 200) {
        setVehicle(response.data.data.result[0].vehicles);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getBrands();
    getVehicle();
  }, []);

  const getBrandsByList = () => {
    if (alphActive === '热门') {
      return brands.slice(0, 45);
    } else {
      return brands.filter((item) => {
        return item.cate.toUpperCase() === alphActive;
      });
    }
  };

  const getVehicleByList = () => {
    if (vehicleActive === 0) {
      return selectBrandId
        ? vehicle.filter((item) => item.brandId === selectBrandId)
        : vehicle;
    } else {
      return vehicle.filter((item) => {
        return item.brandId === selectBrandId;
      });
    }
  };

  return (
    <div className={styles.home}>
      <div className={styles.title}>
        <div className={styles.TitleItem}>品&nbsp;&nbsp;牌:</div>
        <div
          className={alphActive === '热门' ? styles.active : styles.TitleItem}
          onMouseMove={() => {
            setAlphActive('热门');
          }}
        >
          热门
        </div>
        {alphabet.map((item, index) => {
          return (
            <div
              key={index}
              className={alphActive === item ? styles.active : styles.TitleItem}
              onMouseMove={() => {
                setAlphActive(item);
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div
        className={
          getBrandsByList().length < 20 ? styles.brands1 : styles.brands2
        }
      >
        {getBrandsByList().map((item, index) => {
          return (
            <p
              className={styles.brandItem}
              key={item._id}
              onClick={() => {
                setSelectBrandId(item._id);
                setVehicleActive(0);
                getVehicle();
              }}
            >
              {item.name}
            </p>
          );
        })}
      </div>
      <div className={styles.vehicle}>
        <div className={styles.vehicleItem}>车&nbsp;&nbsp;系:</div>
        <div
          className={
            vehicleActive === 0 ? styles.activeVehicle : styles.vehicleItem
          }
          onClick={() => {
            setVehicleActive(0);
          }}
        >
          不限
        </div>
        {getVehicleByList().length > 6
          ? getVehicleByList()
              .slice(0, 6)
              .map((item, index) => {
                return (
                  <div
                    className={
                      vehicleActive === index + 1
                        ? styles.activeVehicle
                        : styles.vehicleItem
                    }
                    key={index}
                    onClick={() => {
                      setVehicleActive(index + 1);
                    }}
                  >
                    {item.name.slice(0, 15)}
                  </div>
                );
              })
          : getVehicleByList().map((item, index) => {
              return (
                <div
                  className={
                    vehicleActive === index + 1
                      ? styles.activeVehicle
                      : styles.vehicleItem
                  }
                  key={index}
                  onClick={() => {
                    setVehicleActive(index + 1);
                  }}
                >
                  {item.name}
                </div>
              );
            })}
        {getVehicleByList().length > 6 ? (
          <div className={styles.vehicleItem} style={{ marginLeft: '10px' }}>
            更多
          </div>
        ) : null}
      </div>
      <div className={styles.filterPrice}>
        <div className={styles.priceItem}>
            价&nbsp;&nbsp;格:
        </div>
        {
            priceList.map((item,index) => {
                return (
                    <div className={styles.priceItem} key={index}>
                        {item}
                    </div>
                )
            })
        }
      </div>
    </div>
  );
}
