/* eslint-disable @next/next/no-img-element */
import styles from '../styles/Header.module.css'

export default function Header({ user, currentPage }) {

    return (
        <header className={styles.header}>
            <img className={styles.logo} alt='communauté agglomération' src='/assets/images/CA_boulonnais.png' />
            <h1 className={styles.title}>Tableau de bord <span className={styles.role}>- {currentPage}</span></h1>
            <p className={styles.username}>Connecté en tant que : <span className={styles.user}>{user}</span></p>
        </header>
    )
}
