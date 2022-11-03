import React from 'react'
import styles from '../styles/CreateUser.module.css'
import { GrLogin } from 'react-icons/gr'

export default function CreateUser() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Création d&apos;un utilisateur</h2>
            <div className={styles.container}>
                <div className={styles.avatar_box}>
                    <img className={styles.avatar} alt="avatar" src='/assets/images/profile_pic.png' />
                </div>
                <article className={styles.article}>
                    <div className={styles.input_box}>
                        <input className={styles.input} autoComplete="off" required></input>
                        <label className={styles.label}>
                            <span className={styles.span}>Nom *</span>
                        </label>
                    </div>
                    <div className={styles.input_box}>
                        <input className={styles.input} autoComplete="off" required ></input>
                        <label className={styles.label}>
                            <span className={styles.span}>Prénom *</span>
                        </label>
                    </div>
                    <div className={styles.input_box}>
                        <input className={styles.input} autoComplete="off" required ></input>
                        <label className={styles.label}>
                            <span className={styles.span}>Mail *</span>
                        </label>
                    </div>
                </article>
                <article className={styles.article} id={styles.last_inputs}>
                    <div className={styles.input_box}>
                        <input type="password" className={styles.input} autoComplete="off" required></input>
                        <label className={styles.label}>
                            <span className={styles.span}>Mot de passe *</span>
                        </label>
                    </div>
                    <div className={styles.input_box}>
                        <input type="password" className={styles.input} autoComplete="off" required ></input>
                        <label className={styles.label}>
                            <span className={styles.span} >Confirmation mot de passe *</span>
                        </label>
                    </div>
                    <div className={styles.input_box}>
                        <select className={styles.select} required name="role" >
                            <option value="company">Recruteur</option>
                            <option value="candidate">Candidat</option>
                            <option value="admin">Administrateur</option>
                        </select>
                        <label className={styles.label}>
                            <span className={styles.span_role} >Rôle *</span>
                        </label>
                    </div>
                </article>
                <button className={styles.button}><GrLogin className={styles.icon} /></button>
            </div>
        </section>
    )
}
