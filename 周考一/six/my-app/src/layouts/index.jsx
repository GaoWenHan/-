import React from 'react';
import styles from './index.module.css';
import Header from '../components/header';
import Main from '../components/main';
import Footer from '../components/footer';

export default function Layouts() {
  return (
    <div className={styles.Container}>
        <Header/>
        <Main/>
        <Footer/>
    </div>
  )
}
