import React, { useEffect, useState } from 'react'
import styles from '../styles/Dashboard.module.css'

export default function Dashboard({ companies, candidates, users }) {

    const [activeUsersCounter, setActiveUsersCounter] = useState(0)
    const [inactiveUsersCounter, setInactiveUsersCounter] = useState(0)
    const [pendingUsersCounter, setPendingUsersCounter] = useState(0)

    const [activeCandidatesCounter, setActiveCandidatesCounter] = useState(0)
    const [inactiveCandidatesCounter, setInactiveCandidatesCounter] = useState(0)
    const [pendingCandidatesCounter, setPendingCandidatesCounter] = useState(0)

    const [activeCompaniesCounter, setActiveCompaniesCounter] = useState(0)
    const [inactiveCompaniesCounter, setInactiveCompaniesCounter] = useState(0)
    const [pendingCompaniesCounter, setPendingCompaniesCounter] = useState(0)

    useEffect(() => {
        let activeCounter = 0;
        let pendingCounter = 0;
        let inactiveCounter = 0;

        users.map(user => {
            if (user.is_active) {
                activeCounter += 1
            }
            setActiveUsersCounter(activeCounter)

            if (!user.is_active) {
                inactiveCounter += 1
            }
            setInactiveUsersCounter(inactiveCounter)

            if (user.is_pending) {
                pendingCounter += 1
            }
            setPendingUsersCounter(pendingCounter)
        })
    }, [users])

    useEffect(() => {
        let activeCounter = 0;
        let pendingCounter = 0;
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

            if (candidate.is_pending) {
                pendingCounter += 1
            }
            setPendingCandidatesCounter(pendingCounter)
        })
    }, [candidates])

    useEffect(() => {
        let activeCounter = 0;
        let pendingCounter = 0;
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

            if (company.is_pending) {
                pendingCounter += 1
            }
            setPendingCompaniesCounter(pendingCounter)
        })
    }, [companies])

    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.title}>{activeUsersCounter == 0 || activeUsersCounter == 1 ? "Utilisateur actif" : "Utilisateurs actifs"}<span className={styles.title_span}>{activeUsersCounter}</span></h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>{activeCompaniesCounter == 0 || activeCompaniesCounter == 1 ? "Recruteur" : "Recruteurs"}</h3>
                        <p className={styles.nb}>{activeCompaniesCounter}</p>
                        {/* <p className={styles.nb_new}> + 2 </p> */}
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>{activeCandidatesCounter == 0 || activeCandidatesCounter == 1 ? "Candidat" : "Candidats"}</h3>
                        <p className={styles.nb}>{activeCandidatesCounter}</p>
                        {/* <p className={styles.nb_new}> + 28 </p> */}
                    </div>
                </article>
            </section>
            <section className={styles.section}>
                <h2 className={styles.title}>A valider<span className={styles.title_span}>{pendingUsersCounter}</span></h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>{pendingCompaniesCounter == 0 || pendingCompaniesCounter == 1 ? "Recruteur" : "Recruteurs"}</h3>
                        <p className={styles.nb}>{pendingCompaniesCounter}</p>
                        {/* <p className={styles.nb_new}> + 1 </p> */}
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>{pendingCandidatesCounter == 0 || pendingCandidatesCounter == 1 ? "Candidat" : "Candidats"}</h3>
                        <p className={styles.nb}>{pendingCandidatesCounter}</p>
                        {/* <p className={styles.nb_new}> + 5 </p> */}
                    </div>
                </article>
            </section>
            <section className={styles.section}>
                <h2 className={styles.title}>{inactiveUsersCounter == 0 || inactiveUsersCounter == 1 ? "Utilisateur inactif" : "Utilisateurs inactifs"}<span className={styles.title_span}>{inactiveUsersCounter}</span></h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>{inactiveCompaniesCounter == 0 || inactiveCompaniesCounter == 1 ? "Recruteur" : "Recruteurs"}</h3>
                        <p className={styles.nb}>{inactiveCompaniesCounter}</p>
                        {/* <p className={styles.nb_new}> - </p> */}
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>{inactiveCandidatesCounter == 0 || inactiveCandidatesCounter == 1 ? "Candidat" : "Candidats"}</h3>
                        <p className={styles.nb}>{inactiveCandidatesCounter}</p>
                        {/* <p className={styles.nb_new}> - </p> */}
                    </div>
                </article>
            </section>
        </>
    )
}
