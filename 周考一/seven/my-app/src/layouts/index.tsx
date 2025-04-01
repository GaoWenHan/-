import React from 'react'
import { Outlet,useNavigate } from 'react-router-dom'
import { Tabbar } from 'react-vant'
import { FriendsO, HomeO, Search, SettingO } from '@react-vant/icons'
import styles from '@/layouts/index.module.sass'

export default function Layouts() {
    const navigate = useNavigate()
    return (
        <div className={styles.Container}>
            <Outlet/>
            <div className={styles.TabbarBox}>
                <Tabbar>
                    <Tabbar.Item icon={<HomeO />} onClick={()=>navigate('/layouts/home')} >首页</Tabbar.Item>
                    <Tabbar.Item icon={<Search />} onClick={() => navigate('/layouts/cate')} >分类</Tabbar.Item>
                    <Tabbar.Item icon={<FriendsO />} onClick={()=>navigate('/layouts/cart')} >购物车</Tabbar.Item>
                    <Tabbar.Item icon={<SettingO />} onClick={() => navigate('/layouts/my')} >个人</Tabbar.Item>
                </Tabbar>
            </div>
        </div>
    )
}
