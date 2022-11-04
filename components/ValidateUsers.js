import React, { useEffect, useState } from 'react'
import styles from '../styles/ValidateUsers.module.css'
import Profil from './Profil'

export default function ValidateUsers({ companies, candidates, setMonitorChange, monitorChange }) {

    const [pendingCandidatesCounter, setPendingCandidatesCounter] = useState(0)
    const [pendingCompaniesCounter, setPendingCompaniesCounter] = useState(0)

    useEffect(() => {
        let pendingCounter = 0;

        candidates.map(candidate => {
            if (candidate.is_pending) {
                pendingCounter += 1
            }
            setPendingCandidatesCounter(pendingCounter)
        })
    }, [candidates])

    useEffect(() => {
        let pendingCounter = 0;

        companies.map(company => {
            if (company.is_pending) {
                pendingCounter += 1
            }
            setPendingCompaniesCounter(pendingCounter)
        })
    }, [companies])

    return (
        <>
            <section className={styles.section}>
                <h2 className={styles.title}>Utilisateurs à valider</h2>
                <article className={styles.article}>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Recruteurs</h3>
                        <p className={pendingCompaniesCounter != 0 ? styles.nb : styles.nb_zero}>{pendingCompaniesCounter}</p>
                        <hr className={styles.hr} />
                        {companies.map(company => {
                            if (company.is_pending) return <Profil user={company} role='recruteur' />
                        })}
                    </div>
                    <div className={styles.info_container}>
                        <h3 className={styles.title_sub}>Candidats</h3>
                        <p className={pendingCandidatesCounter != 0 ? styles.nb : styles.nb_zero}>{pendingCandidatesCounter}</p>
                        <hr className={styles.hr} />
                        {candidates.map(candidate => {
                            if (candidate.is_pending) return <Profil user={candidate} role='candidat' />
                        })}
                    </div>
                </article>
            </section>
        </>
    )
}
