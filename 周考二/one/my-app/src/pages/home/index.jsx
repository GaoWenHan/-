import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import PriceFilter from '@/components/PriceFilter';
import CarFilter from '@/components/carFilter';
import { AppstoreOutlined, MenuOutlined } from '@ant-design/icons';

export default function Home() {
  const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(i + 65));

  const [alphActive, setAlphActive] = useState('热门');
  const [vehicleActive, setVehicleActive] = useState(0);
  const [brands, setBrands] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [selectBrandId, setSelectBrandId] = useState('');
  const [carList, setCarList] = useState([]);
  const [layoutStauts, setLayoutStatus] = useState(false);

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
        setVehicle(response.data.data.result);
      }
    } catch (error) {
      return error;
    }
  };

  const getCarList = async (sortPrice) => {
    try {
      let response = await axios.get('/api/car/car',{
        params:{
            priceSort:sortPrice
        }
      });
      if (response.data.code == 200) {
        setCarList(response.data.data.result);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getBrands();
    getVehicle();
    getCarList();
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

  const getCarTyId = (carTyId) => {
    return brands.map((item) => {
      if (item._id === carTyId) {
        return item.name;
      }
    });
  };

  const getCarVyId = (carVyId) => {
    return vehicle.map((item) => {
      if (item._id === carVyId) {
        return item.name.slice(0, 10);
      }
    });
  };

  const getRandomCars = (list, count) => {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomCars = getRandomCars(carList, 20);

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
      <PriceFilter CarData={getCarList} />
      <CarFilter />
      <div className={styles.LayoutSelect}>
        <div className={layoutStauts === false ? styles.LayoutActive : null}>
          <AppstoreOutlined
            onClick={() => {
              setLayoutStatus(false);
            }}
          />
        </div>
        <div className={layoutStauts === true ? styles.LayoutActive : null}>
          <MenuOutlined
            onClick={() => {
              setLayoutStatus(true);
            }}
          />
        </div>
      </div>
      { layoutStauts ? (
        <div className={styles.CarBox}>
          {randomCars.map((item, index) => {
            return (
              <div className={styles.CarItem} key={item._id}>
                <div className={styles.CarImgBox}>
                  <img src="http://gips3.baidu.com/it/u=3419425165,837936650&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024" />
                </div>
                <div className={styles.carDetail}>
                  <p>汽车名称:{item.carName}</p>
                  <p>汽车价格:{item.carPrice}</p>
                  <p>汽车品牌:{getCarTyId(item.carTyId)}</p>
                  <p>汽车车系:{getCarVyId(item.carVyId)}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.CarBoxTwo}>
          {randomCars.map((item, index) => {
            return (
              <div className={styles.CarItemTwo} key={item._id}>
                <div className={styles.CarImgBoxTwo}>
                  <img src="http://gips3.baidu.com/it/u=3419425165,837936650&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024" />
                </div>
                <div className={styles.carDetail}>
                  <p>汽车名称:{item.carName.slice(0, 10)}</p>
                  <p>汽车价格:{item.carPrice}</p>
                  <p>汽车品牌:{getCarTyId(item.carTyId)}</p>
                  <p>汽车车系:{getCarVyId(item.carVyId)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
