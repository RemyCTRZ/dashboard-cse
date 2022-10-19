import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import CreateAdmin from '../components/createAdmin'
import { useState, useEffect } from 'react'
import ValidateUsers from '../components/ValidateUsers'
import UsersList from '../components/UsersList'
import { apiService } from '../services/APIService'

export default function Home() {

  const [dashboardWindow, setDashboardWindow] = useState({
    dashboard: true,
    createAdmin: false,
    validateUsers: false,
    usersList: false,
    candidatesList: false,
    companiesList: false,
  })

  const [users, setUsers] = useState([])
  const [candidates, setCandidates] = useState([])
  const [companies, setCompanies] = useState([])
  const [monitorChange, setMonitorChange] = useState(false)

  useEffect(() => {
    apiService.get('users').then(response => setUsers(response.data))
    apiService.get('candidates').then(response => setCandidates(response.data))
    apiService.get('companies').then(response => setCompanies(response.data))
  }, [dashboardWindow, monitorChange])

  const switchToDashboard = () => {
    setDashboardWindow({
      dashboard: true,
      createAdmin: false,
      validateUsers: false,
      usersList: false,
      candidatesList: false,
      companiesList: false,
    })
  }

  const switchToCreateAdmin = () => {
    setDashboardWindow({
      dashboard: false,
      createAdmin: true,
      validateUsers: false,
      usersList: false,
      candidatesList: false,
      companiesList: false,
    })
  }

  const switchToValidateUsers = () => {
    setDashboardWindow({
      dashboard: false,
      createAdmin: false,
      validateUsers: true,
      usersList: false,
      candidatesList: false,
      companiesList: false,
    })
  }

  const switchToUsersList = () => {
    setDashboardWindow({
      dashboard: false,
      createAdmin: false,
      validateUsers: false,
      usersList: true,
      candidatesList: false,
      companiesList: false,
    })
  }

  const switchToCandidatesList = () => {
    setDashboardWindow({
      dashboard: false,
      createAdmin: false,
      validateUsers: false,
      usersList: false,
      candidatesList: true,
      companiesList: false,
    })
  }

  const switchToCompaniesList = () => {
    setDashboardWindow({
      dashboard: false,
      createAdmin: false,
      validateUsers: false,
      usersList: false,
      candidatesList: false,
      companiesList: true,
    })
  }


  return (
    <>
      <Head>
        <title className={styles.title}>Dashboard - CSE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <Navbar
          switchToDashboard={switchToDashboard}
          switchToCreateAdmin={switchToCreateAdmin}
          switchToValidateUsers={switchToValidateUsers}
          switchToUsersList={switchToUsersList}
          switchToCandidatesList={switchToCandidatesList}
          switchToCompaniesList={switchToCompaniesList}
        />
        {dashboardWindow.dashboard ? (<Dashboard />) : ('')}
        {dashboardWindow.createAdmin ? (<CreateAdmin />) : ('')}
        {dashboardWindow.validateUsers ? (<ValidateUsers />) : ('')}
        {dashboardWindow.usersList ? (<UsersList users={users} setMonitorChange={setMonitorChange} />) : ('')}
        {dashboardWindow.candidatesList ? (<UsersList candidates={candidates} setMonitorChange={setMonitorChange} />) : ('')}
        {dashboardWindow.companiesList ? (<UsersList companies={companies} setMonitorChange={setMonitorChange} />) : ('')}
      </main>

      <footer className={styles.footer}>
      </footer>
    </>
  )
}