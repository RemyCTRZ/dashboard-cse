import { hasCookie, getCookie, setCookie } from 'cookies-next'
import { IoLogInSharp } from 'react-icons/io5'
import { apiService } from '../services/APIService'
import { useRef } from 'react'
import styles from '../styles/Login.module.css'

export default function Login({ setCurrentUser, setAccessToken, optionsAxios }) {

    const mailRef = useRef(null)
    const passwordRef = useRef(null)

    function Login() {
        if (!mailRef.current.value || !passwordRef.current.value) return alert("Veuillez rentrer vos identifiants")
        apiService.login({
            mail: mailRef.current.value,
            password: passwordRef.current.value
        })
            .then(response => {
                setAccessToken(response.data.accessToken)
                setCookie('accessToken', response.data.accessToken)
                setCookie('refreshToken', response.data.refreshToken)
                if (hasCookie('accessToken')) optionsAxios = {
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    }
                }
                apiService.get(`admins/${response.data.user_id}`, optionsAxios)
                    .then(response => {
                        setCurrentUser(response.data.firstname)
                        setCookie('userFirstname', response.data.firstname)
                    })
                    .catch(error => alert(error))
            })
            .catch(error => alert(error))
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
                            <input className={styles.input} ref={mailRef} type="email" name="email" required ></input>
                            <label className={styles.label}>
                                <span className={styles.span}>Mail *</span>
                            </label>
                        </div>
                        <div className={styles.input_box}>
                            <input type="password" className={styles.input} ref={passwordRef} required></input>
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
