import React, { useRef } from 'react'
import styles from '../styles/Login.module.css'
import { IoLogInSharp } from 'react-icons/io5'
import { apiService } from '../services/APIService'

export default function Login({ setIsConnected, isConnected }) {

    const mailRef = useRef(null)
    const passwordRef = useRef(null)

    function Login() {
        apiService.login({
            mail: mailRef.current.value,
            password: passwordRef.current.value
        })
            .then(response => console.log(response.data))
    }

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
                            <input className={styles.input} ref={mailRef} type="email" placeholder='' name="email" autoComplete="off" required ></input>
                            <label className={styles.label}>
                                <span className={styles.span}>Mail *</span>
                            </label>
                        </div>
                        <div className={styles.input_box}>
                            <input type="password" className={styles.input} ref={passwordRef} placeholder='' autoComplete="off" required></input>
                            <label className={styles.label}>
                                <span className={styles.span}>Mot de passe *</span>
                            </label>
                        </div>
                        <button className={styles.btn} onClick={() => setIsConnected(!isConnected)}><IoLogInSharp className={styles.icon} /></button>
                    </form>
                    <button onClick={() => Login()}>TEST</button>
                </article>
            </div>
        </section>
    )
}
