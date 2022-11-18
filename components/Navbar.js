import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCheck, FaUsers, FaArrowRight, FaPowerOff, FaUserTie, FaUser } from 'react-icons/fa'
import styles from '../styles/Navbar.module.css'

export default function Navbar({ switchToDashboard, switchToValidateUsers, switchToAdminsList, switchToCandidatesList, switchToCompaniesList, isConnected, setIsConnected, setCurrentUser, dashboardWindow, setCurrentPage }) {

    const [isNavbarActive, setIsNavbarActive] = useState(true)

    function logout() {
        setIsConnected(!isConnected)
        setCurrentUser({
            lastname: null,
            role: null
        })
    }

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
                <FaArrowRight id={isNavbarActive && styles.active} className={styles.arrow} />
            </button>
            <button className={styles.link} onClick={() => {
                switchToDashboard()
                setCurrentPage('Accueil')
            }}>
                <span className={dashboardWindow.dashboard ? styles.span_active : styles.span}>
                    <AiFillHome className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Accueil</p>}
                </span>
            </button>
            <button className={styles.link} onClick={() => {
                switchToValidateUsers()
                setCurrentPage("Validation d'utilisateurs")
            }}>
                <span className={dashboardWindow.validateUsers ? styles.span_active : styles.span}>
                    <FaUserCheck className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Validation d&apos;utilisateur</p>}
                </span>
            </button>
            <button className={styles.link} onClick={() => {
                switchToAdminsList()
                setCurrentPage('Liste des administrateurs')
            }}>
                <span className={dashboardWindow.adminsList ? styles.span_active : styles.span}>
                    <FaUsers className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Liste des administrateurs</p>}
                </span>
            </button>
            <button className={styles.link} onClick={() => {
                switchToCandidatesList()
                setCurrentPage('Liste des candidats')
            }}>
                <span className={dashboardWindow.candidatesList ? styles.span_active : styles.span}>
                    <FaUser className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Liste des candidats</p>}
                </span>
            </button>
            <button className={styles.link} onClick={() => {
                switchToCompaniesList()
                setCurrentPage('Liste des recruteurs')
            }}>
                <span className={dashboardWindow.companiesList ? styles.span_active : styles.span}>
                    <FaUserTie className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Liste des recruteurs</p>}
                </span>
            </button>
            <button className={styles.logout} onClick={() => logout()}>
                <span className={styles.span} id={styles.logout}>
                    <FaPowerOff className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Déconnexion</p>}
                </span>
            </button>
        </nav>
    )
}
