import React from 'react'
import styles from '../styles/Login.module.css'
import { IoLogInSharp } from 'react-icons/io5'

export default function Login({ setIsConnected, isConnected }) {
    return (
        <section className={styles.section}>
            <div className={styles.articles_container}>
                <article className={styles.article}>
                    <img className={styles.img} alt="cse" src='/assets/images/CA_boulonnais.png' />
                </article>
                <article className={styles.article}>
                    <img className={styles.img_login} alt="cse" src='/assets/images/login.svg' />
                    <form className={styles.form}>
                        <h2 className={styles.title}>Bienvenue</h2>
                        <div className={styles.input_box}>
                            <input className={styles.input} type="email" placeholder='' name="email" autoComplete="off" required ></input>
                            <label className={styles.label}>
                                <span className={styles.span}>Mail *</span>
                            </label>
                        </div>
                        <div className={styles.input_box}>
                            <input type="password" className={styles.input} placeholder='' autoComplete="off" required></input>
                            <label className={styles.label}>
                                <span className={styles.span}>Mot de passe *</span>
                            </label>
                        </div>
                        <button className={styles.btn} onClick={() => setIsConnected(!isConnected)}><IoLogInSharp className={styles.icon} /></button>
                    </form>
                </article>
            </div>
        </section>
    )
}
