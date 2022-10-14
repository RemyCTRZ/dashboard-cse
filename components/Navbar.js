import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaUserCheck, FaUserPlus, FaUsers, FaArrowRight, FaPowerOff } from 'react-icons/fa'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {

    const [isNavbarActive, setIsNavbarActive] = useState(true)

    function navbar_activate() {

        if (!isNavbarActive) {
            setIsNavbarActive(true);
        }
        else if (isNavbarActive) {
            setIsNavbarActive(false);
        }
    }

    return (
        <nav className={styles.nav}>
            <button className={styles.button} onClick={navbar_activate}>
                <FaArrowRight id={isNavbarActive ? (styles.active) : ('')} className={styles.arrow} />
            </button>
            <Link href="/">
                <span className={styles.span}>
                    <AiFillHome className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Accueil </p>) : ('')}
                </span>
            </Link>
            <Link href="/">
                <span className={styles.span}>
                    <FaUserPlus className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Création d&apos;admin </p>) : ('')}
                </span>
            </Link>
            <Link href="/">
                <span className={styles.span}>
                    <FaUserCheck className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Validation d&apos;utilisateur </p>) : ('')}
                </span>
            </Link>
            <Link href="/">
                <span className={styles.span}>
                    <FaUsers className={styles.icon} />
                    {isNavbarActive ? (<p className={styles.txt}>Liste d&apos;utilisateurs </p>) : ('')}
                </span>
            </Link>
            <Link href="/">
                <span className={styles.span} id={styles.logout}>
                    <FaPowerOff className={styles.icon}/>
                    {isNavbarActive ? (<p className={styles.txt}>Déconnexion </p>) : ('')}
                </span>
            </Link>
        </nav>
    )
}
