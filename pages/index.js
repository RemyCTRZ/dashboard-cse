import { getCookie, hasCookie, setCookie } from 'cookies-next'
import jwt_decode from "jwt-decode"
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { BsExclamationLg } from 'react-icons/bs'
import CreateModal from '../components/CreateModal'
import Dashboard from '../components/Dashboard'
import Header from '../components/Header'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import UsersList from '../components/UsersList'
import { apiService } from '../services/APIService'
import styles from '../styles/Home.module.css'

// Renouvellement de l'Access Token s'il a expiré pour les cookies
export async function renewToken() {
    let token = getCookie('accessToken')
    let decodedToken = jwt_decode(token)
    let currentTime = new Date().getTime() / 1000
    let isExpired = decodedToken.exp < currentTime

    if (!isExpired) return

    const refreshToken = getCookie('refreshToken')
    const newToken = await apiService.refreshAccessToken({ "token": refreshToken })

    setCookie('accessToken', newToken.data.accessToken, { secure: true, sameSite: 'none' })
}

export default function DashboardAdmin() {

    // Ouvrir ou fermer la modal d'erreur
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    function pushError(error) {
        setError(true)
        setErrorMsg(error)
    }

    function modalClick(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    // Admin actuellement connecté
    const [currentUser, setCurrentUser] = useState(null)
    const [isConnected, setIsConnected] = useState(false)

    // Routeur
    const [dashboardWindow, setDashboardWindow] = useState({
        dashboard: true,
        candidatesList: false,
        companiesList: false,
    })

    const switchToDashboard = () => {
        setDashboardWindow({
            dashboard: true,
            candidatesList: false,
            companiesList: false,
        })
    }

    const switchToCandidatesList = () => {
        setDashboardWindow({
            dashboard: false,
            candidatesList: true,
            companiesList: false,
        })
    }

    const switchToCompaniesList = () => {
        setDashboardWindow({
            dashboard: false,
            candidatesList: false,
            companiesList: true,
        })
    }

    // Page sur laquelle l'admin est actuellement
    const [currentPage, setCurrentPage] = useState('Accueil')

    // Permet de forcer le refresh de la page
    const [monitorChange, setMonitorChange] = useState(false)

    // Candidats récupérés via l'API
    const [candidates, setCandidates] = useState([])

    // Recruteurs récupérés via l'API
    const [companies, setCompanies] = useState([])

    // Avatar par défaut
    const [imgSource, setImgSource] = useState('../assets/images/profile_pic.png')

    // Permet d'ouvrir ou de fermer la modal de création d'utilisateur
    const [open, setOpen] = useState(false)

    // Access Token
    const [accessToken, setAccessToken] = useState()

    // Headers nécessaires pour les requêtes
    let optionsAxios = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    // Retrouve le nom de l'utilisateur qui est connecté via un cookie
    useEffect(() => {
        setCurrentUser(getCookie('userFirstname'))
    }, [hasCookie('userFirstname')])

    // Retrouve la page sur laquelle était l'utilisateur via un cookie
    useEffect(() => {
        if (!hasCookie('currentPage')) {
            return
        }
        if (getCookie('currentPage') == 'Home')
            return switchToDashboard()
        else if (getCookie('currentPage') == 'CandidatesList')
            return switchToCandidatesList()
        else if (getCookie('currentPage') == 'CompaniesList')
            return switchToCompaniesList()
    }, [getCookie('currentPage')])

    // Permet à l'utilisateur de rester connecté après un refresh et récupère les données des candidats & recruteurs
    useEffect(() => {
        if (!hasCookie('refreshToken')) return
        renewToken()
            .then(() => {
                if (hasCookie('accessToken')) optionsAxios = {
                    headers: {
                        Authorization: `Bearer ${getCookie('accessToken')}`
                    }
                }
                setIsConnected(true)
                apiService.get('candidates', optionsAxios)
                    .then(response => setCandidates(response.data))
                    .catch(error => pushError(error.response.data.message))
                apiService.get('companies', optionsAxios)
                    .then(response => setCompanies(response.data))
                    .catch(error => pushError(error.response.data.message))
            })
            .catch(error => pushError(error))
    }, [dashboardWindow, monitorChange, hasCookie('refreshToken')])



    return (
        <>
            <Head>
                <title className={styles.title}>Dashboard - CSE</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            {error &&
                <div className={styles.error_shadow} onClick={() => setError(false)}>
                    <BsExclamationLg className={styles.error_icon} onClick={(e) => modalClick(e)} />
                    <div className={styles.error_container} onClick={(e) => modalClick(e)}>
                        <h2 className={styles.error_title}>Erreur :</h2>
                        <p className={styles.error_msg}>{errorMsg ? errorMsg : "Message d'erreur"}</p>
                        <div className={styles.error_btn_container}>
                            <button className={styles.error_btn} onMouseUp={() => setError(false)}>OK</button>
                            <span className={styles.error_btn_truc} />
                        </div>
                    </div>
                </div>
            }


            {!isConnected ? (

                <Login optionsAxios={optionsAxios} setAccessToken={setAccessToken} setCurrentUser={setCurrentUser} setError={setError} setErrorMsg={setErrorMsg} />

            ) : (
                <>
                    <Header
                        currentPage={currentPage} user={currentUser}
                    />
                    <main className={styles.main}>

                        <Navbar
                            currentUser={currentUser}
                            setCurrentUser={setCurrentUser}
                            switchToDashboard={switchToDashboard}
                            switchToCandidatesList={switchToCandidatesList}
                            switchToCompaniesList={switchToCompaniesList}
                            dashboardWindow={dashboardWindow}
                            setCurrentPage={setCurrentPage}
                            setIsConnected={setIsConnected}
                            open={open}
                            setOpen={setOpen}
                            optionsAxios={optionsAxios}
                        />

                        {/* DASHBOARD */}
                        {dashboardWindow.dashboard && <Dashboard companies={companies} candidates={candidates} />}

                        {/* LISTE DES CANDIDATS */}
                        {dashboardWindow.candidatesList && <UsersList imgSource={imgSource} setImgSource={setImgSource} optionsAxios={optionsAxios} candidates={candidates} setMonitorChange={setMonitorChange} monitorChange={monitorChange} setError={setError} setErrorMsg={setErrorMsg} />}

                        {/* LISTE DES RECRUTEURS */}
                        {dashboardWindow.companiesList && <UsersList imgSource={imgSource} setImgSource={setImgSource} optionsAxios={optionsAxios} companies={companies} setMonitorChange={setMonitorChange} monitorChange={monitorChange} setError={setError} setErrorMsg={setErrorMsg} />}

                        {/* CREATE MODAL */}
                        <CreateModal open={open} setOpen={setOpen} imgSource={imgSource} setImgSource={setImgSource} monitorChange={monitorChange} setMonitorChange={setMonitorChange} />
                    </main>
                </>
            )}
        </>
    )
}