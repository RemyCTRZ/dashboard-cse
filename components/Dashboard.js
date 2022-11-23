import { useEffect, useState } from 'react'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard({ companies, candidates }) {

    const [activeCandidatesCounter, setActiveCandidatesCounter] = useState(0)
    const [inactiveCandidatesCounter, setInactiveCandidatesCounter] = useState(0)

    const [activeCompaniesCounter, setActiveCompaniesCounter] = useState(0)
    const [inactiveCompaniesCounter, setInactiveCompaniesCounter] = useState(0)

    useEffect(() => {
        let activeCounter = 0;
        let inactiveCounter = 0;

        candidates.map(candidate => {
            if (candidate.is_active) {
                activeCounter += 1
            }
            setActiveCandidatesCounter(activeCounter)

            if (!candidate.is_active) {
                inactiveCounter += 1
            }
            setInactiveCandidatesCounter(inactiveCounter)
        })
    }, [candidates])

    useEffect(() => {
        let activeCounter = 0;
        let inactiveCounter = 0;

        companies.map(company => {
            if (company.is_active) {
                activeCounter += 1
            }
            setActiveCompaniesCounter(activeCounter)

            if (!company.is_active) {
                inactiveCounter += 1
            }
            setInactiveCompaniesCounter(inactiveCounter)
        })
    }, [companies])

    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.title}>Utilisateurs actifs
                    <span className={styles.title_span}>{activeCandidatesCounter + activeCompaniesCounter}</span>
                </h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Recruteurs</h3>
                        <p className={styles.nb}>{activeCompaniesCounter}</p>
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Candidats</h3>
                        <p className={styles.nb}>{activeCandidatesCounter}</p>
                    </div>
                </article>
            </section>
            <section className={styles.section}>
                <h2 className={styles.title}>Utilisateurs inactifs
                    <span className={styles.title_span}>{inactiveCandidatesCounter + inactiveCompaniesCounter}</span>
                </h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Recruteurs</h3>
                        <p className={styles.nb}>{inactiveCompaniesCounter}</p>
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Candidats</h3>
                        <p className={styles.nb}>{inactiveCandidatesCounter}</p>
                    </div>
                </article>
            </section>
        </>
    )
}
