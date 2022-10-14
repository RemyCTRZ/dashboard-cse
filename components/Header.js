/* eslint-disable @next/next/no-img-element */
import React from 'react'
import styles from '../styles/Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <img className={styles.logo} alt='communauté agglomération' src='/assets/images/CA_boulonnais.png'/>
            <h1 className={styles.title}>Tableau de bord</h1>
            <p className={styles.username}>Username</p>
        </header>
    )
}
