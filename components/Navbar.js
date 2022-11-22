import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCheck, FaArrowRight, FaPowerOff, FaUserTie, FaUser } from 'react-icons/fa'
import styles from '../styles/Navbar.module.css'
import { deleteCookie, setCookie } from 'cookies-next'

export default function Navbar({ switchToDashboard, switchToCandidatesList, switchToCompaniesList, setCurrentUser, dashboardWindow, setCurrentPage, setIsConnected }) {

    const [isNavbarActive, setIsNavbarActive] = useState(true)

    function logout() {
        setCurrentUser(null)
        deleteCookie('accessToken')
        deleteCookie('refreshToken')
        setIsConnected(false)
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
                setCookie('currentPage', 'Home')
            }}>
                <span className={dashboardWindow.dashboard ? styles.span_active : styles.span}>
                    <AiFillHome className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Accueil</p>}
                </span>
            </button>
            <button className={styles.link} onClick={() => {
                switchToCandidatesList()
                setCurrentPage('Liste des candidats')
                setCookie('currentPage', 'CandidatesList')
            }}>
                <span className={dashboardWindow.candidatesList ? styles.span_active : styles.span}>
                    <FaUser className={styles.icon} />
                    {isNavbarActive && <p className={styles.txt}>Liste des candidats</p>}
                </span>
            </button>
            <button className={styles.link} onClick={() => {
                switchToCompaniesList()
                setCurrentPage('Liste des recruteurs')
                setCookie('currentPage', 'CompaniesList')
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
