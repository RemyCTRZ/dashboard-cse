import React, { useRef } from 'react'
import styles from '../styles/Login.module.css'
import { IoLogInSharp } from 'react-icons/io5'
import { apiService } from '../services/APIService'

export default function Login({ setIsConnected, setCurrentUser }) {

    const mailRef = useRef(null)
    const passwordRef = useRef(null)

    function Login() {
        apiService.login({
            mail: mailRef.current.value,
            password: passwordRef.current.value
        })
            .then(response => {
                apiService.get(`/admins/${response.data.user_id}`)
                    .then(response => {
                        setCurrentUser({
                            firstname: response.data.firstname,
                            role: response.data.role

                        })
                        setIsConnected(true)
                    })
                    .catch(error => alert(error.response.data.message == "Requested admin does not exist." && "Cet utilisateur n'est pas un administrateur"))
            })
            .catch(error => alert(error.response.data.message))
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
                            <input className={styles.input} ref={mailRef} type="email" name="email" autoComplete="off" required ></input>
                            <label className={styles.label}>
                                <span className={styles.span}>Mail *</span>
                            </label>
                        </div>
                        <div className={styles.input_box}>
                            <input type="password" className={styles.input} ref={passwordRef} autoComplete="off" required></input>
                            <label className={styles.label}>
                                <span className={styles.span}>Mot de passe *</span>
                            </label>
                        </div>
                    </form>
                    <button className={styles.btn} onClick={() => Login()}><IoLogInSharp className={styles.icon} /></button>
                </article>
            </div>
        </section >
    )
}
