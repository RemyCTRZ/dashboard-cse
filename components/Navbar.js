import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCheck, FaUserPlus, FaUsers, FaArrowRight, FaPowerOff, FaUserTie, FaUser } from 'react-icons/fa'
import styles from '../styles/Navbar.module.css'

export default function Navbar({ switchToDashboard, switchToCreateUser, switchToValidateUsers, switchToUsersList, switchToCandidatesList, switchToCompaniesList, isConnected, setIsConnected }) {

    const [isNavbarActive, setIsNavbarActive] = useState(true)


    async function navbar_activate() {

        if (!isNavbarActive) {
            await setIsNavbarActive(true);
        }
        else if (isNavbarActive) {
            await setIsNavbarActive(false);
        }
    }

    return (
        <nav className={styles.nav}>
            <button className={styles.button} onClick={navbar_activate}>
                <FaArrowRight id={isNavbarActive ? (styles.active) : ('')} className={styles.arrow} />
            </button>
            <button className={styles.link} onClick={switchToDashboard}>
                <span className={styles.span}>
                    <AiFillHome className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Accueil </p>) : ('')}
                </span>
            </button>
            <button className={styles.link} onClick={switchToCreateUser}>
                <span className={styles.span}>
                    <FaUserPlus className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Création d&apos;utilisateur </p>) : ('')}
                </span>
            </button>
            <button className={styles.link} onClick={switchToValidateUsers}>
                <span className={styles.span}>
                    <FaUserCheck className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Validation d&apos;utilisateur </p>) : ('')}
                </span>
            </button>
            <button className={styles.link} onClick={switchToUsersList}>
                <span className={styles.span}>
                    <FaUsers className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Liste d&apos;utilisateurs </p>) : ('')}
                </span>
            </button>
            <button className={styles.link} onClick={switchToCandidatesList}>
                <span className={styles.span}>
                    <FaUser className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Liste de candidats </p>) : ('')}
                </span>
            </button>
            <button className={styles.link} onClick={switchToCompaniesList}>
                <span className={styles.span}>
                    <FaUserTie className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Liste de recruteurs</p>) : ('')}
                </span>
            </button>
            <button className={styles.logout} onClick={() => setIsConnected(!isConnected)}>
                <span className={styles.span} id={styles.logout}>
                    <FaPowerOff className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Déconnexion </p>) : ('')}
                </span>
            </button>
        </nav>
    )
}
