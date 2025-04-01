import React from 'react'
import styles from '@/pages/home/index.module.sass'
import { Swiper } from 'antd-mobile'


const colors = [
    'https://img2.baidu.com/it/u=774628507,3597615254&fm=253&fmt=auto&app=120&f=JPEG?w=750&h=500',
    'https://img1.baidu.com/it/u=1823535390,979714743&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
    'https://img0.baidu.com/it/u=3581056956,289618768&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
    'https://img2.baidu.com/it/u=2303708579,2686113994&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500'
]

const items = colors.map((color, index) => (
    <Swiper.Item key={index}>
        <div
            className={styles.content}
            style={{ background: color }}
        >
            <img src={color} className={styles.Img} />
        </div>
    </Swiper.Item>
))

export default function Home() {
    return (
        <div>
            <div className={styles.DemoSwiper}>
                <Swiper
                    loop
                    autoplay
                    onIndexChange={i => {
                        console.log(i, 'onIndexChange1')
                    }}
                >
                    {items}
                </Swiper>
            </div>
            <div className={styles.ShopTitleX}>
                精选标题 &nbsp; {`>`}
            </div>
            <div>
                <Swiper stuckAtBoundary={false} slideSize={80} defaultIndex={0} >
                    {items}
                </Swiper>
            </div>
            <div className={styles.ShopTitleX}>
                人气推荐 &nbsp; {`>`}
            </div>
        </div>
    )
}
