import React from 'react'
import styles from '../styles/Profil.module.css'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

export default function Profil() {
    return (
        <article className={styles.article}>
            <div className={styles.btn_container}>
                <button className={styles.btn}><AiFillCheckCircle className={styles.icon} /></button>
                <button className={styles.btn}><AiFillCloseCircle className={styles.icon} /></button>
            </div>
            <div className={styles.container}>
                <div className={styles.info_box}>
                    <img className={styles.avatar} alt="avatar" src='/assets/images/profile_pic.png' />
                    <div className={styles.infos}>
                        <div className={styles.nom_prenom}>
                            <p className={styles.lastname}>Jean</p>
                            <p className={styles.firstname}>Charles</p>
                        </div>
                        <p className={styles.email}>jeancharles@gmail.com</p>
                        <p className={styles.createdAt}>Inscription : 17/10/2022</p>
                    </div>
                </div>
                <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
        </article>
    )
}
