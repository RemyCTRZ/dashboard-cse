import React from 'react'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard() {
    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.title}>Utilisateurs actifs</h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Recruteurs</h3>
                        <p className={styles.nb}>123</p>
                        <p className={styles.nb_new}> + 2 </p>
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Candidats</h3>
                        <p className={styles.nb}>593</p>
                        <p className={styles.nb_new}> + 28 </p>
                    </div>
                </article>
            </section>
            <section className={styles.section}>
                <h2 className={styles.title}>A valider</h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Recruteurs</h3>
                        <p className={styles.nb}>31</p>
                        <p className={styles.nb_new}> + 1 </p>
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Candidats</h3>
                        <p className={styles.nb}>68</p>
                        <p className={styles.nb_new}> + 5 </p>
                    </div>
                </article>
            </section>
            <section className={styles.section}>
                <h2 className={styles.title}>Utilisateurs inactifs</h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Recruteurs</h3>
                        <p className={styles.nb}>8</p>
                        <p className={styles.nb_new}> - </p>
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Candidats</h3>
                        <p className={styles.nb}>23</p>
                        <p className={styles.nb_new}> - </p>
                    </div>
                </article>
            </section>
        </>
    )
}
