import React from 'react'
import styles from '../styles/UsersList.module.css'
import Users from './Users'

export default function UsersList() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Liste des utilisateurs</h2>
            <div className={styles.filtre_container}>
                <button className={styles.filtre}>Candidats</button>
                <button className={styles.filtre}>Recruteurs</button>
            </div>
            <article className={styles.article}>
                <Users />
            </article>
        </section>
    )
}
