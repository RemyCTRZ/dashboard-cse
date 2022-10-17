import React, { useEffect } from 'react'
import styles from '../styles/ValidateUsers.module.css'
import Profil from './Profil'

export default function ValidateUsers() {

    function isZero() {

        let nbRecruteurs = document.getElementById("nb_recruteurs")
        let nbCandidats = document.getElementById("nb_candidats")

        if (nbRecruteurs.innerHTML == 0) {
            nbRecruteurs.setAttribute("data-empty", "0")
        }

        if (nbCandidats.innerHTML == 0) {
            nbCandidats.setAttribute("data-empty", "0")
        }

    }

    useEffect(() => {
        isZero()
    })

    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.title}>Utilisateurs à valider</h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Recruteurs</h3>
                        <p className={styles.nb} id="nb_recruteurs">0</p>
                        <hr className={styles.hr} />
                        <Profil />
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Candidats</h3>
                        <p className={styles.nb} id="nb_candidats">5</p>
                        <hr className={styles.hr} />
                        <Profil />
                    </div>
                </article>
            </section>
        </>
    )
}
