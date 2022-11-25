import { hasCookie, getCookie, setCookie } from 'cookies-next'
import { IoLogInSharp } from 'react-icons/io5'
import { apiService } from '../services/APIService'
import { useRef, useState } from 'react'
import styles from '../styles/Login.module.css'

export default function Login({ setCurrentUser, setAccessToken, optionsAxios, setError, setErrorMsg }) {

    function pushError(error) {
        setError(true)
        setErrorMsg(error)
    }

    const mailRef = useRef(null)
    const passwordRef = useRef(null)

    function Login() {
        if (!mailRef.current.value || !passwordRef.current.value) return pushError("Veuillez rentrer vos identifiants")
        const mailInput = document.getElementById('mailInput')
        if (!mailInput.validity.valid) return pushError('Veuillez rentrer un mail valide')
        apiService.login({
            mail: mailRef.current.value,
            password: passwordRef.current.value
        })
            .then(response => {
                setAccessToken(response.data.accessToken)
                setCookie('accessToken', response.data.accessToken, { secure: true, sameSite: 'none' })
                setCookie('refreshToken', response.data.refreshToken, { secure: true, sameSite: 'none' })
                if (hasCookie('accessToken')) optionsAxios = {
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    }
                }
                apiService.get(`admins/${response.data.user_id}`, optionsAxios)
                    .then(response => {
                        setCurrentUser(response.data.firstname)
                        setCookie('userFirstname', response.data.firstname, { secure: true, sameSite: 'none' })
                    })
                    .catch(error => pushError(error.response.data.message))
            })
            .catch(error => pushError(error.response.data.message))
    }

    const [isEmpty, setIsEmpty] = useState(true)

    function checkIfEmpty(e) {
        if (e.target.value || e.target.value != '') return setIsEmpty(false)
        setIsEmpty(true)
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
                            <input className={styles.input} id='mailInput' data-error={!isEmpty ? 1 : 0} ref={mailRef} type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" onChange={(e) => checkIfEmpty(e)} required />
                            <label className={styles.label}>
                                <span className={styles.span} data-error={!isEmpty ? 1 : 0}>Mail *</span>
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
