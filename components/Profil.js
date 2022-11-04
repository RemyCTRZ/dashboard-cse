import React from 'react'
import styles from '../styles/Profil.module.css'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

export default function Profil({ user, role }) {

    return (
        <>
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
                                {role == 'candidat' ?
                                    <>
                                        <p className={styles.lastname}>{user.lastname}</p>
                                        <p className={styles.firstname}>{user.firstname}</p>
                                    </>
                                    :
                                    <p className={styles.lastname}>{user.name}</p>
                                }
                            </div>
                            <p className={styles.email}>{user.mail}</p>
                            <p className={styles.createdAt}>Inscription : {user.createdAt}</p>
                        </div>
                    </div>
                    <p className={styles.desc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </article>
        </>
    )
}
