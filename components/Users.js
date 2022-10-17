import React from 'react'
import styles from '../styles/Users.module.css'

export default function Users() {
    return (
        <>
            <article className={styles.article}>
                <img className={styles.avatar} alt="avatar" src='/assets/images/pdp.jpg' />
                <div className={styles.container}>
                    <div className={styles.info_box}>
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
            <article className={styles.article}>
                <img className={styles.avatar} alt="avatar" src='/assets/images/pdp.jpg' />
                <div className={styles.container}>
                    <div className={styles.info_box}>
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
        </>
    )
}
